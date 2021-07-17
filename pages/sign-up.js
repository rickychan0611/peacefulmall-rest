import SigningForms from '../components/SigningForms';

const SignUp = ({ code }) => <SigningForms signUp code={code}/>

export const getServerSideProps = async ({query}) => {
    console.log(query.invite_code)
    return {
        props : {code : query.invite_code ? query.invite_code : "" }
    }
}


export default SignUp