import styled from 'styled-components';
import { Form, Button, Icon, Transition } from 'semantic-ui-react';

const formItems = [
  {
    label: "First name",
    key: 'first_name'
  },
  {
    label: "Last name",
    key: 'last_name'
  },
  {
    label: "Email",
    key: 'email'
  },
  {
    label: "Phone Number",
    key: 'phone'
  }
]
const ProfileForm = ({ editedUser, setEditedUser, setVisible, saveUserQuery, err, saving, disableSave, visible }) => {

  const handleChange = (e, name) => {
    setVisible(false);
    setEditedUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (

    <Form onSubmit={saveUserQuery}>
      <Form.Group widths="equal">
        {formItems.map((item, i) => {
          return (
            <Form.Input
              width={8}
              key={i}
              fluid
              required
              label={item.label}
              placeholder={item.label}
              value={editedUser[item.key]}
              onChange={(e) => handleChange(e, item.key)}
              error={err && err[item.key]}
            />
          )
        })}
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

  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export default ProfileForm;
