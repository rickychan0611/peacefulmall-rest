import { Form, Button, Icon, Modal, Header } from 'semantic-ui-react';

const formItems = [
  {
    label: "Receiver's name",
    key: "name",
  },
  {
    label: "Phone Number",
    key: "phone",
  },
  {
    label: "Address",
    key: "detail_address",
  },
  {
    label: "City",
    key: "city",
  },
  {
    label: "Province",
    key: "province",
  },
  {
    label: "Post Code",
    key: "post_code",
  },
  {
    label: "Country",
    key: "country",
  },
]

const AddressEditModal = ({
  open,
  setOpen,
  loading,
  saveAddressQuery,
  err,
  selectedAddress,
  setSelectedAddress
}) => {

  const handleChange = (e, name) => {
    setSelectedAddress((prev) => ({ ...prev, [name]: e.target.value }));
  };


  return (
    <Modal
      size="mini"
      open={open}
    >
      <Header content={selectedAddress && selectedAddress.type.toUpperCase()} />
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
          <Icon name="remove" /> Cancel
          </Button>
        <Button style={{ backgroundColor: "#ff614d", color: "white" }} onClick={() => !loading && saveAddressQuery(false)}>
          {loading ? <><Icon loading name='spinner' />Saving</> : <><Icon name="checkmark" /> Save</>}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};


export default AddressEditModal;
