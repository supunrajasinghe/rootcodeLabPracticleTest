import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Container, Card, Button, Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import Modal from "react-modal";

//actions
import { getPosts, addPost } from "../../redux/actions/posts";
import { addComment } from "../../redux/actions/comments";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function LandingPage(props) {
  const { dispatch } = props;

  const postForm = useRef(null);
  const commentForm = useRef(null);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  var subtitle;
  const [postModalIsOpen, setAddPostModalIsOpen] = React.useState(false);
  const [postViewModal, setviewPostModalIsOpen] = React.useState(false);
  const [openedPost, setOpenPost] = React.useState(null);

  function openModal() {
    setAddPostModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setAddPostModalIsOpen(false);
    setviewPostModalIsOpen(false);
  }

  function openViewPostModal(post) {
    setOpenPost(post);
    setviewPostModalIsOpen(true);
  }

  const renderList = () => {
    return props.postsList.map((item) => (
      <Card
        onClick={() => {
          openViewPostModal(item);
        }}
        key={item._id}
        style={{ marginBottom: "15px" }}
      >
        <Card.Header>{item.title}</Card.Header>
        <Card.Body>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Card>
    ));
  };

  const handleAddPost = () => {
    const form = postForm.current;
    let formData = {
      title: form["title"].value,
      description: form["description"].value,
    };
    dispatch(addPost(formData));
  };

  const renderComments = () => {
    return openedPost.comments.map((item) => (
      <Card style={{ marginBottom: "15px" }} key={item._id}>
        <Card.Body>
          <Card.Text>{item.comment}</Card.Text>
        </Card.Body>
      </Card>
    ));
  };

  const handleAddComment = () => {
    const form = commentForm.current;
    let formData = {
      comment: form["comment"].value,
      postId: openedPost._id,
    };
    dispatch(addComment(formData));
  };

  return (
    <Container>
      <Button onClick={openModal}>Create New Post</Button>
      <br />
      <br />

      <Modal
        isOpen={postViewModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>{openedPost && openedPost.title}</h2>
        <Card>
          <Card.Body>
            <Card.Text>{openedPost && openedPost.description}</Card.Text>
          </Card.Body>
        </Card>
        <br />

        {openedPost &&
          openedPost.comments &&
          openedPost.comments.length > 0 &&
          renderComments()}

        <br />
        <br />

        <Form ref={commentForm}>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control name={"comment"} as="textarea" rows={3} />
          </Form.Group>
          <Button onClick={handleAddComment} variant="primary" type="submit">
            Add Comment
          </Button>
          <Button onClick={closeModal} variant="danger" type="submit">
            Close
          </Button>
        </Form>
      </Modal>

      <Modal
        isOpen={postModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Form ref={postForm}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name={"title"}
              type="text"
              placeholder="Enter Title"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control name={"description"} as="textarea" rows={3} />
          </Form.Group>
          <Button onClick={handleAddPost} variant="primary" type="submit">
            Submit
          </Button>
          <Button onClick={closeModal} variant="danger" type="submit">
            Close
          </Button>
        </Form>
      </Modal>

      {props.postsList ? renderList() : <p>no data found</p>}
    </Container>
  );
}

export default connect((state) => ({
  postsList: state.posts.postList,
}))(LandingPage);
