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
  const [index, setIndex] = useState(0);

  //refresh index when reviews update
  useEffect(() => {
    console.log("reviewIndex", reviews.findIndex(review => review.product_id === item.product_id))
    setIndex(reviews.findIndex(review => review.product_id === item.product_id))
  },[reviews])


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      let newfiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      console.log('newfiles', newfiles);
      // setFiles([...files, ...newfiles]);
      let files = reviews[index] ? reviews[index].files : null;

      if (files) {
      handleChange([...files, ...newfiles], "files")
      }
      else {handleChange([...newfiles], "files")}

    }
  });


  const handleChange = (value, name) => {
    let Obj = {
      product_id: item.product_id,
      product_name: item.product_name,
      [name]: value
    }
    let prev = [...reviews]
    console.log("Obj", Obj)

    if (index !== -1) {
      prev[index] = { ...prev[index], ...Obj }
    }
    else {
      prev.push(Obj)
    }
    setReviews(prev)
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
      {JSON.stringify(reviews)}
      <h2>{item.product_name}</h2>
      <Form onSubmit={handleSubmit}>
        <StarWrapper>
          <ReactStars
            className="stars"
            count={5}
            size={32}
            activeColor="#ffd700"
            color="#d3d3d3"
            // value={reviews.rating}
            onChange={(e) => handleChange(e, 'rating')}
          />
        </StarWrapper>
        <Title>Add a photo</Title>
        <Row>
          {reviews && reviews[index] && reviews[index].files && reviews[index].files[0] &&
            reviews[index].files.map((file, i) => {
              return (
                <div style={{ position: 'relative' }}>

                  <CloseIcon
                    onClick={() => {
                      let reviewClone = [...reviews]
                      let files = [...reviews[index].files]
                      files.splice(i, 1)
                      reviewClone[index].files = files
                      setReviews(reviewClone)
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
          // value=""
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
