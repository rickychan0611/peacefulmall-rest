import { Form, Button, Icon, Modal, Header } from 'semantic-ui-react';
import useTranslation from 'next-translate/useTranslation';

const AddressEditModal = ({
  open,
  setOpen,
  loading,
  saveAddressQuery,
  err,
  selectedAddress,
  setSelectedAddress
}) => {

  const { t } = useTranslation('profile');

  const handleChange = (e, name) => {
    setSelectedAddress((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const formItems = [
    {
      label: t`Receiver's name`,
      key: "name",
    },
    {
      label: t`PhoneNumber`,
      key: "phone",
    },
    {
      label: t`Address`,
      key: "detail_address",
    },
    {
      label: t`City`,
      key: "city",
    },
    {
      label: t`Province`,
      key: "province",
    },
    {
      label: t`Post Code`,
      key: "post_code",
    },
    {
      label: t`Country`,
      key: "country",
    },
  ]

  return (
    <Modal
      size="mini"
      open={open}
    >
      <Header content={selectedAddress && t(selectedAddress.type).toUpperCase()} />
      <Modal.Content>
        <Form onSubmit={saveAddressQuery}>
          {formItems.map((item, i) => <Form.Input
            key={i}
            fluid
            required
            label={item.label}
            placeholder={item.label}
            value={selectedAddress && selectedAddress[item.key]}
            onChange={(e) => {
              handleChange(e, item.key);
            }}
            error={err && err[item.key]}
          />)}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => !loading && setOpen(false)}>
          <Icon name="remove" /> {t`Cancel`}
          </Button>
        <Button style={{ backgroundColor: "#ff614d", color: "white" }} onClick={() => !loading && saveAddressQuery(false)}>
          {loading ? <><Icon loading name='spinner' />{t`Saving`}</> : <><Icon name="checkmark" /> {t`Save`}</>}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};


export default AddressEditModal;
