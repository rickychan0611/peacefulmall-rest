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
  openEdit,
  setOpenEdit,
  loading,
  handleAddressSubmit,
  handleEditAddressChange,
  handleSave,
  err,
  selectedAddress
}) => {
  return (
    <Modal
      size="mini"
      open={openEdit}
    >
      <Header content={selectedAddress && selectedAddress.type.toUpperCase()} />
      <Modal.Content>
        <Form onSubmit={handleSave}>
          {formItems.map((item, i) => {
            return (
              <div key={i}>
                <Form.Input
                  fluid
                  required
                  label={item.label}
                  placeholder={item.label}
                  value={selectedAddress && selectedAddress[item.key]}
                  onChange={(e) => {
                    handleEditAddressChange(e, item.key);
                  }}
                  error={err && err[item.key]}
                />
              </div>
            )
          })}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => !loading && setOpenEdit(false)}>
          <Icon name="remove" /> Cancel
          </Button>
        <Button color="green" onClick={() => !loading && handleAddressSubmit(false)} loading={loading}>
          <Icon name="checkmark" /> Submit
          </Button>
      </Modal.Actions>
    </Modal>
  );
};


export default AddressEditModal;
