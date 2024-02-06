import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

const Filters = () => {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tags, setTags] = useState('');

  // Handler functions for each filter
  const handleCityChange = (e) => setCity(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleTagsChange = (selectedOptions) => {
    setTags(selectedOptions);
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col>
          <Form.Label>City</Form.Label>
          <Form.Select value={city} onChange={handleCityChange}>
            <option value="">Select City</option>
            {/* Populate city options */}
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {/* Populate category options */}
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={date} onChange={handleDateChange} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Label>Time</Form.Label>
          <Form.Select value={time} onChange={handleTimeChange}>
            <option value="">Select Time</option>
            {/* Populate time options */}
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Label>Tags</Form.Label>
          <Select
            isMulti
            name="tags"
            // options={tagOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={tags}
            onChange={handleTagsChange}
            placeholder="Select Tags"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
