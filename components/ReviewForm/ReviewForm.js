import { useEffect, useState, useCallback } from 'react';
import { Image, Icon, Form, Button, Modal, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';
import { useDropzone } from 'react-dropzone';

const ReviewForm = ({
  item,
  files,
  setFiles,
  reviews,
  currentOrder,
  handleSubmit,
  setReviews
}) => {
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      let newfiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      console.log('newfiles', newfiles);
      setFiles([...files, ...newfiles]);
    }
  });

  const handleChange = (value, name) => {
    let tempObj = {
      product_id: item.product_id,
      product_name: item.product_name,
      [name]: value
    }
    let reviewTemp = [...reviews]
    if (reviewTemp.length > 0) {
      reviewTemp = reviewTemp.map((review) => {
      review.product_id === item.product_id ? tempObj : review
    })}
    else {
      reviewTemp.push(tempObj)
    }
    setReviews(reviewTemp)
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        closeIcon
        basic>
        <img
          src={openImage}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </Modal>

      <h2>{item.product_name}</h2>
      <Form onSubmit={handleSubmit}>
        <StarWrapper>
          <ReactStars
            className="stars"
            count={5}
            size={32}
            activeColor="#ffd700"
            color="#d3d3d3"
            value={reviews.rating}
            onChange={(e) => handleChange(e, 'rating')}
          />
        </StarWrapper>
        <Title>Add a photo</Title>
        <Row>
          {files[0] &&
            files.map((file, i) => {
              return (
                <div style={{ position: 'relative' }}>
                  <CloseIcon
                    onClick={() => {
                      setFiles((prev) => prev.filter((item) => item !== prev[i]));
                    }}>
                    <Icon name="times" />
                  </CloseIcon>
                  <ReviewImage
                    src={file.preview}
                    key={i}
                    onClick={() => {
                      setOpenImage(URL.createObjectURL(file));
                      setOpen(true);
                    }}
                  />
                </div>
              );
            })}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <ReviewImage src="/addPhotoBox-blue.JPG" />
            ) : (
              <ReviewImage src="/addPhotoBox.JPG" />
            )}
          </div>
        </Row>
        <Form.TextArea
          required
          label="Add a written review"
          placeholder="What did you like or dislike?"
          rows={3}
          value={reviews.content}
          onChange={(e) => handleChange(e.target.value, 'content')}
        />
        <Row style={{ marginTop: 30 }}>
          <Button onClick={handleSubmit}>Submit</Button>
        </Row>
      </Form>
      <Divider />
    </>
  );
};

const CloseIcon = styled.div`
  position: absolute;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 2px 2px 4px 4px;
`;
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
`;
const ReviewImage = styled(Image)`
  height: 100px;
  width: 100px;
  object-fit: cover;
`;
const StarWrapper = styled.div`
  margin: 10px 0 10px 0;
  height: 100%;
  span {
    height: 40px;
    margin-left: 5px;
  }
`;
export default ReviewForm;
