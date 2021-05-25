import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Form, Button, Icon, Transition } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import moment from 'moment';
import validation from '../../util/validation';
import MaskInput from 'react-maskinput';
import {HOST_URL} from '../../env';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';

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
const ProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [disableSave, setDisableSave] = useState(true);
  const [err, setErr] = useState(null);
  const [cookies] = useCookies(null);
  const [user, setUser] = useRecoilState(userAtom);
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e, name) => {
    console.log(e.target.value)
    setVisible(false);
    setEditedUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  // const query = async (body) => {
  //   try {
  //     await axios.post(HOST_URL + '/api/user/eidt', body, {
  //       headers: { Authorization: cookies.userToken },
  //     });
  //     await getAddressesQuery();
  //     setLoading(false)
  //     setOpen(false)
  //   } catch (err) {
  //     console.log(err)
  //     setLoading(false)
  //   }
  // }

  const saveUserQuery = () => {
    setLoading(true);
    setErr(null);
    validation(editedUser)
      .then(async (res) => {
        console.log(res);
        await axios.post(HOST_URL + '/api/user/edit', editedUser, {
          headers: { Authorization: cookies.userToken },
        });
        // if successful
        setUser(editedUser);
        setVisible(true);
        setDisableSave(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err: ", err);
        setLoading(false);
        setErr((prev) => ({ ...prev, ...err }));
      });
  };

  useEffect(() => {
    ///// disable save changes button
    editedUser &&
      editedUser.first_name === user.first_name &&
      editedUser.last_name === user.last_name &&
      editedUser.phone === user.phone &&
      editedUser.email === user.email
      ? setDisableSave(true)
      : setDisableSave(false);
  }, [editedUser]);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  return (
    <>
      {editedUser &&
        <Form>
          <Form.Group widths="equal">
            {formItems.map((item, i) => {
              return (
                item.key !== "phone" ?
                  <Form.Input
                    key={i}
                    fluid
                    required={item.required}
                    label={item.label}
                    placeholder={item.label}
                    value={editedUser[item.key]}
                    onChange={(e) => !loading && handleChange(e, item.key)}
                    error={err && err[item.key]}
                  /> :
                  <Form.Input
                    key={i}
                    fluid
                    required={item.required}
                    label={item.label}
                    error={err && err[item.key]}
                    children={
                      <MaskInput mask={'000-000-0000'} size={10} placeholder={item.label}
                        value={editedUser && editedUser[item.key] ? editedUser[item.key] : 0}
                        onChange={(e) =>handleChange(e, item.key)}
                      />}
                  />
              )
            })}
          </Form.Group>

          {/**** Birthday picker */}
          {/* <Form.Group>
            <SemanticDatepicker
              allowOnlyNumbers
              label="Birthday"
              placeholder="Pick a date"
              value={editedUser.birthday ? new Date(moment(editedUser.birthday).format()) : null}
              onChange={(e, data) => handleChange({ target: { value: data.value } }, "birthday")}
              error={err && err.birthday} />
          </Form.Group> */}

          <ButtonWrapper>
            <Button onClick={() => !loading && setEditedUser(user)}>Cancel</Button>
            <Button
              type="submit"
              content={
                loading ? (
                  <Icon name="spinner" loading style={{ margin: 0, width: 30 }} />
                ) : (
                  'Save Changes'
                )
              }
              disabled={disableSave}
              color="red"
              onClick={() => saveUserQuery()}
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
