import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Input, Row, Col, Label, FormGroup, Form, Button, Spinner,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';
import * as notesActions from '../../store/notes/notesActions';

export class AddNote extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isNoteAdding: false,
      followupDate: new Date(),
      status: '',
    };

    this.noteTextareaRef = React.createRef();
    this.updateNoteDate = this.updateNoteDate.bind(this);
    this.updateNoteStatus = this.updateNoteStatus.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  get statusSelectOptions() {
    return [
      { value: 'OA', label: 'OA' },
      { value: 'Hold', label: 'Hold' },
      { value: 'Need Ship Date', label: 'Need Ship Date' },
      { value: 'Need Tracking Number', label: 'Need Tracking Number' },
      { value: 'In Transit', label: 'In Transit ' },
    ];
  }

  updateNoteDate(selectedDate) {
    this.setState({ followupDate: selectedDate });
  }

  updateNoteStatus({ value }) {
    this.setState({ status: value });
  }

  submitForm(event) {
    event.preventDefault();
    const { followupDate, status } = this.state;
    const { addNote, purchaseOrderId, onNoteAdded } = this.props;
    const note = this.noteTextareaRef.current.value;

    this.setState({ isNoteAdding: true });
    addNote({
      note, followupDate, status, po: purchaseOrderId,
    }).finally(() => {
      this.noteTextareaRef.current.value = '';
      this.setState({
        isNoteAdding: false,
        status: '',
        followupDate: new Date(),
      }, onNoteAdded);
    });
  }

  render() {
    const { followupDate, isNoteAdding } = this.state;

    // @TODO add styles for select
    return (
      <Form className="d-block" onSubmit={this.submitForm}>
        <Row>
          <Col xs={12} md={8}>
            <Label htmlFor="noteMessage" className="text-muted">Message:</Label>
            <Input
              id="noteMessage"
              innerRef={this.noteTextareaRef}
              name="note"
              type="textarea"
              rows={5}
            />
          </Col>
          <Col xs={12} md={4}>
            <FormGroup>
              <Label className="text-muted">Status:</Label>
              <Select
                onChange={this.updateNoteStatus}
                options={this.statusSelectOptions}
              />
            </FormGroup>
            <FormGroup className="mb-0 d-flex align-items-end justify-content-between">
              <div className="d-flex flex-column">
                <Label className="text-muted">Followup Date:</Label>
                <DatePicker
                  selected={followupDate}
                  dropdownMode="select"
                  onChange={this.updateNoteDate}
                  customInput={<Input bsSize="sm" />}
                />
              </div>
              <Button color="success" type="submit" size="sm">
                {isNoteAdding ? <Spinner className="mr-1" size="sm" color="light" /> : null}
                Create
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired,
  purchaseOrderId: PropTypes.string.isRequired,
  onNoteAdded: PropTypes.func,
};

AddNote.defaultProps = {
  onNoteAdded: () => {},
};

const mapActionsToProps = (dispatch) => ({
  addNote: (payload) => dispatch(notesActions.addNote(payload)),
});

export default connect(null, mapActionsToProps)(AddNote);
