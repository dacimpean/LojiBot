import React from 'react';
import {
  Form, FormGroup, Label, Input,
  Button, Card, Row, Col, CardBody,
  CardHeader, FormFeedback,
} from 'reactstrap';

export default function ResetPassword() {
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
                <Form>
                  <FormGroup>
                    <Label htmlFor="loginInput">
                      New password
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="loginInput"
                      placeholder="enter your email address"
                    />
                    <FormFeedback>Field is required</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="loginInput">
                      Confirm new password
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="loginInput"
                      placeholder="enter your email address"
                    />
                    <FormFeedback>Field is required</FormFeedback>
                  </FormGroup>
                  <div className="d-flex justify-content-center">
                    <Button type="submit" color="primary">Change Password</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
