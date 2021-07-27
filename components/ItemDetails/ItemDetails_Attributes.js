import styled from 'styled-components';
import { Form, Grid, Icon, Radio, Image } from 'semantic-ui-react';

const ItemDetails_Attributes = ({ item, onChange }) => {
  return (
    <>
      {item.attributes && item.attributes[0] && <h4>Choose your options</h4>}
      <Form>
        <Form.Field></Form.Field>
        {item.attributes &&
          item.attributes[0] &&
          item.attributes.map((attribute, i) => {
            return (
              <div key={i}>
                <Form.Field>
                  <OptionTitle>
                    <h4 style={{ fontWeight: 'bold' }}>
                      {attribute.name}
                      {/* <span style={{ color: 'grey' }}>
                            {attribute.type === 1
                              ? ' (choose one only)'
                              : ' (you can choose more than one)'}
                          </span> */}
                      <span style={{ color: 'red' }}>
                        {attribute.require_status === 1 ? ' *required' : ''}
                      </span>
                    </h4>
                  </OptionTitle>

                  {attribute.options &&
                    attribute.options[0] &&
                    attribute.options.map((option, j) => {
                      return (
                        <Grid key={j}>
                          <Grid.Column width={10} style={{ paddingRight: 0 }}>
                            {attribute.type === 2 ? (
                              <Row>
                                <QtyContainer>
                                  <Icon
                                    style={{ cursor: 'pointer' }}
                                    name="minus circle"
                                    onClick={() => {
                                      onChange('minus', option);
                                    }}
                                  />
                                  <span style={{ margin: '0 8px 0 5px' }}>
                                    {option.quantity ? option.quantity : 0}
                                  </span>
                                  <Icon
                                    style={{ cursor: 'pointer', marginRight: 10 }}
                                    name="plus circle"
                                    onClick={() => {
                                      onChange('plus', option);
                                    }}
                                  />
                                </QtyContainer>
                                {option.option_name}
                              </Row>
                            ) : (
                              // <Checkbox
                              //   type={attribute.type === 2 ? 'checkbox' : 'radio'}
                              //   label={option.option_name}
                              //   name="radioGroup"
                              //   // value={option.option_price}
                              //   // checked={checked[option_attribite.id]}
                              //   onChange={() => {

                              //     // Handle UNCHECK! Uncheck if optionId is checked, remove option from attritubes array and selctedOptions
                              //     // selectedOptions is used to control checkboxes
                              //     if (selectedOptions.includes(option.id)) {
                              //       // remove option in attributes
                              //       let temp = [...attributes];
                              //       let attIndex = temp.findIndex(
                              //         (item) => item.id === option.attribute_id
                              //       );
                              //       let optIndex = temp[attIndex].options.findIndex(
                              //         (item) => item.id === option.id
                              //       );

                              //       temp[attIndex].options.splice(optIndex, 1);

                              //       if (temp[attIndex].options.length === 0) {
                              //         temp.splice(attIndex, 1);
                              //       }

                              //       setAttributes(temp);

                              //       setSelectedOptions(
                              //         selectedOptions.filter((id) => id !== option.id)
                              //       );
                              //     } else {
                              //       setSelectedOptions([...selectedOptions, option.id]);
                              //       updateAttribute(option);
                              //     }
                              //   }}
                              // />
                              <Radio
                                type="radio"
                                label={option.option_name}
                                name={option.attribute_id.toString()}
                                checked={option.quantity === 1}
                                onChange={() => {
                                  onChange('radio', option);
                                }}
                              />
                            )}
                          </Grid.Column>
                          <Grid.Column width={6} style={{ textAlign: 'right', paddingLeft: 0 }}>
                            + ${option.option_price} / ea.
                          </Grid.Column>
                        </Grid>
                      );
                    })}
                </Form.Field>
              </div>
            );
          })}
      </Form>
    </>
  );
};

const Row = styled.div`
 display: flex;
 flex-flow: row nowrap;
 width: 100%;
`;
const OptionTitle = styled.div`
  padding: 5px;
  background-color: #ded9d9;
  margin: 15px 0 15px 0;
`;
const QtyContainer = styled.div`
  /* margin: 10px 10px 0 10px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  min-width: 60px;
`;

export default ItemDetails_Attributes;
