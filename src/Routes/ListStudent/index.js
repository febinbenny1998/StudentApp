import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function ListStudent() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      let data = await axios.get(
        "http://192.168.1.29:3001/api/getstudentdetails"
      );
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      // eslint-disable-next-line no-console
      console.log(data.data);
      setList(data.data);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate({ pathname: "/edit", search: `?id=${id}` });
  };
  const handleDelete = async (id) => {
    await axios.put("http://192.168.1.29:3001/api/deletestudent", { id });
    getData();
  };
  return (
    <>
      {loading ? (
        <Container className="d-flex  justify-content-center  h-100  align-items-center ">
          <div class="spinner-grow text-light" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-light" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-light" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow text-light" role="status">
            <span class="sr-only"></span>
          </div>
        </Container>
      ) : (
        <Container className="bg-light">
          <h3 className="text-center">Student Details</h3>
          {list.map((item) => {
            return (
              <Row className="m-0 p-0">
                <Col key={item.id} className="w-100 my-2">
                  <ListGroup>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <label className="fw-bold">Name:</label>
                      <label>{item.name}</label>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <label className="fw-bold">Year of Passing:</label>
                      <label>{item.passingYear}</label>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <label className="fw-bold">Branch:</label>
                      <label> {item.branch}</label>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <label className="fw-bold">Grade:</label>
                      <label> {item.grade ? item.grade : "-"}</label>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col
                  xs={2}
                  className="d-flex aligns-items-center justify-content-center flex-column "
                >
                  <Button variant="primary" onClick={() => handleEdit(item.id)}>
                    Edit
                  </Button>
                  <Button
                    className=" mt-3"
                    variant="primary"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Container>
      )}
    </>
  );
}

export default ListStudent;
