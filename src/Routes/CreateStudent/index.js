import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { Container, InputGroup, Toast, ToastContainer } from "react-bootstrap";

function CreateStudent(props) {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    branch: "",
    passingYear: "",
  });
  const [show, setShow] = useState(false);
  const handleInputChange = (event, name) => {
    setStudentInfo({ ...studentInfo, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    setShow(true);
    await axios.post("http://192.168.1.29:3001/api/addstudent", studentInfo);
  };

  const handleDetails = () => {
    navigate("/listStudent");
  };
  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={show}
          onClose={() => setShow(false)}
          delay={3000}
          position="top-end"
          bg={"success"}
          autohide
        >
          <Toast.Header>
            <strong>Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Created successfully</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container className="d-flex h-100 justify-content-center text-center align-items-center ">
        <Card className="py-5 px-5 " bg="light">
          <Card.Title>Create Student</Card.Title>
          <div className="mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text>Student Name</InputGroup.Text>
              <Form.Control
                placeholder="Enter student name"
                value={studentInfo.name}
                onChange={(event) => handleInputChange(event, "name")}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Branch</InputGroup.Text>
              <Form.Control
                placeholder="Enter student branch"
                value={studentInfo.branch}
                onChange={(event) => handleInputChange(event, "branch")}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Year of Passing</InputGroup.Text>
              <Form.Select
                placeholder={"Select"}
                onChange={(event) => handleInputChange(event, "passingYear")}
              >
                {[2021, 2022, 2023, 2024, 2025, 2026, 2027].map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleDetails}>
              View Student Details
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Add Student
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default CreateStudent;
