import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Form, Button, Icon, Transition } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import moment from 'moment';

const formItems = [
  {
    label: "First name",
    key: 'first_name',
    required: true
  },
  {
    label: "Last name",
    key: 'last_name',
    required: true
  },
  {
    label: "Email",
    key: 'email',
    required: true
  },
  {
    label: "Phone Number",
    key: 'phone',
    required: true
  }
]
const ProfileForm = ({ setVisible, saveUserQuery, saving, visible, user }) => {
  const [editedUser, setEditedUser] = useState(null);
  const [disableSave, setDisableSave] = useState(true);
  const [err, setErr] = useState(null);

  const handleChange = (e, name) => {
    console.log(e.target.value)
    setVisible(false);
    setEditedUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  // useEffect(() => {
  //   ///// disable save changes button
  //   editedUser &&
  //     editedUser.first_name === user.first_name &&
  //     editedUser.last_name === user.last_name &&
  //     editedUser.phone === user.phone &&
  //     editedUser.email === user.email
  //     ? setDisableSave(true)
  //     : setDisableSave(false);
  // }, [editedUser]);


  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  return (
    <>
      {editedUser &&
        <Form onSubmit={saveUserQuery}>
          <Form.Group widths="equal">
            {formItems.map((item, i) => {
              return (
                <Form.Input
                  key={i}
                  fluid
                  required={item.required}
                  label={item.label}
                  placeholder={item.label}
                  value={editedUser[item.key]}
                  onChange={(e) => handleChange(e, item.key)}
                  error={err && err[item.key]}
                />
              )
            })}
          </Form.Group>
          <Form.Group>

            <SemanticDatepicker
              allowOnlyNumbers
              label="Birthday"
              placeholder="Pick a date"
              value={editedUser.birthday ? new Date(moment(editedUser.birthday).format()) : null}
              onChange={(e, data) => handleChange({ target: { value: data.value } }, "birthday")}
              error={err && err.birthday} />
          </Form.Group>

          <ButtonWrapper>
            <Button
              content={
                saving ? (
                  <Icon name="spinner" loading style={{ margin: 0, width: 30 }} />
                ) : (
                  'Save Changes'
                )
              }
              disabled={disableSave}
              color="red"
            // onClick={() => saveUserQuery()}
            />
            <Transition
              animation="swing right"
              duration={{ hide: 0, show: 1000 }}
              visible={visible}>
              <div>
                <Icon name="check" color="green" /> saved!
                </div>
            </Transition>
          </ButtonWrapper>
        </Form>
      }
    </>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export default ProfileForm;
