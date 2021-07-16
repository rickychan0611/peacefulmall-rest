import { useState } from 'react';
import axios from 'axios';
import { Divider, Icon, Button, Message } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import { useCookies } from 'react-cookie';
import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';

const InviteCode = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(null);
  const { t } = useTranslation('profile');
  const [loading, setLoading] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCode = async () => {
    setLoading(true)
    setDisableSave(true)
    try {
      const getCodeQuery = await axios.post(process.env.NEXT_PUBLIC_HOST_URL + '/api/user/dist/generatecode',
        { body: "" },
        { headers: { Authorization: cookies.userToken } })
      console.log("getCodeQuery", getCodeQuery);
      const getUser = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/user/info', {
        headers: { Authorization: cookies.userToken }
      });
      console.log('USER DATA', getUser);
      localStorage.setItem('user', JSON.stringify(getUser.data.data));
      setUser(getUser.data.data);
      setLoading(false)
      setDisableSave(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
      setDisableSave(false)
    }
  }

  return (
    <>
      <h3>Invite Your Friends and Earn Reward Points!</h3>
      <Divider />
      Share your invite code with your friends and family. When they register with your code, you will earn points while they make purchases! <br />
      {user.codes.length === 0 ?
        <Button
          style={{marginTop: 20, marginBottom: 40}}
          content={
            loading ? (
              <Icon name="spinner" loading style={{ margin: "0", width: 30 }} />
            ) : (
              <>Generate your invite code</>
            )
          }
          disabled={disableSave}
          color="green"
          onClick={() => getCode()}
        /> :
        <>

          <b style={{ marginRight: 20 }}>Your Invite Code: </b>
          <Message compact color='yellow'><Wrapper>
            <div>{user.codes[0].code}</div>
            <Icon name='copy'
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigator.clipboard.writeText(user.codes[0].code)
                setCopied(true)
              }}
            ></Icon>
          </Wrapper>
          </Message>
          
          {copied && <code style={{ marginLeft: 20, color: "green" }}>copied!</code>}
        </>
      }
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 150px;
`;
export default InviteCode;
