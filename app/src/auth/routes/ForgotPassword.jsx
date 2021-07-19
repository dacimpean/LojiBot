import React, { PureComponent } from 'react';
import {
  Card, Row, Col, CardBody, CardHeader,
} from 'reactstrap';

import { ForgotPasswordForm } from '../components';

export default class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    // eslint-disable-next-line
    console.log('Reset Password', data);
  }

  render() {
    return (
      <section className="d-flex flex-grow-1 flex-column align-items-center justify-content-center">
        <div className="container">
          <Row noGutters>
            <Col
              md={{
                size: 8,
                offset: 2,
              }}
              lg={{
                size: 6,
                offset: 3,
              }}
            >
              <h1 className="text-center mb-3">Loji</h1>
              <Card className="border-0 shadow-z4">
                <CardHeader className="bg-primary p-1" />
                <CardBody>
                  <ForgotPasswordForm onSubmit={this.onSubmit} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}
