import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function EditStudent() {
  const search = useLocation().search;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [studentInfo, setStudentInfo] = useState({});
  const handleInputChange = (event, name) => {
    setStudentInfo({ ...studentInfo, [name]: event.target.value });
  };

  useEffect(() => {
    getStudentDetails();
    // eslint-disable-next-line
  }, []);

  const getStudentDetails = async () => {
    const id = new URLSearchParams(search).get("id");
    let info = await axios.post(
      "http://192.168.1.29:3001/api/getindividualdetails",
      { id: id }
    );
    setStudentInfo(info.data[0]);
  };
  const handleUpdate = async () => {
    await axios.post("http://192.168.1.29:3001/api/updatestudentdetails", {
      ...studentInfo,
    });
    setShow(true);
    setTimeout(() => {
      navigate("/listStudent");
    }, 1000);
  };

  return (
    <Container className="d-flex justify-content-center h-100 text-center align-items-center ">
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
          <Toast.Body className="text-white">Deleted successfully</Toast.Body>
        </Toast>
      </ToastContainer>
      <Card className="py-3 px-2" bg="light">
        <Card.Title>Edit Student</Card.Title>
        <div className="mx-auto">
          <InputGroup className="mb-3">
            <InputGroup.Text>Student Name</InputGroup.Text>
            <Form.Control
              placeholder="Enter student name"
              value={studentInfo.name}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Grade</InputGroup.Text>
            <Form.Control
              placeholder="Enter student grade"
              value={studentInfo.grade}
              onChange={(event) => handleInputChange(event, "grade")}
            />
          </InputGroup>
        </div>
        <div>
          <Button variant="primary" onClick={handleUpdate}>
            Update Student
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default EditStudent;
