import { Form } from 'semantic-ui-react';

const AddressNewForm = ( {err, setNewAddress, newAddress} ) => {
  return (
    <>
      <Form.Input
        required
        placeholder="Address"
        label="Address"
        value={newAddress.address1}
        onChange={(e) => setNewAddress((prev) => ({ ...prev, address1: e.target.value }))}
        error={err.address1}
      />
      <Form.Group widths="equal">
        <Form.Input
          placeholder="Unit / Apt. #"
          label="Unit / Apt. #"
          value={newAddress.address2}
          onChange={(e) => setNewAddress((prev) => ({ ...prev, address2: e.target.value }))}
          error={err.address2}
        />
        <Form.Input
          required
          placeholder="City"
          label="City"
          value={newAddress.City}
          onChange={(e) => setNewAddress((prev) => ({ ...prev, city: e.target.value }))}
          error={err.City}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          required
          placeholder="Province"
          label="Province"
          value={newAddress.province}
          onChange={(e) => setNewAddress((prev) => ({ ...prev, province: e.target.value }))}
          error={err.province}
        />
        <Form.Input
          required
          placeholder="Country"
          label="Country"
          value={newAddress.country}
          onChange={(e) => setNewAddress((prev) => ({ ...prev, country: e.target.value }))}
          error={err.country}
        />
      </Form.Group>
      <Form.Button style={{ backgroundColor: '#ff614d', color: 'white' }}>Save</Form.Button>
    </>
  );
};

export default AddressNewForm;
