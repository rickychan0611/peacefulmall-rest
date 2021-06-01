import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HOST_URL } from '../../env';

import { useRecoilState } from 'recoil';
import {
  currentItem as currentItemAtom,
  currentShop as currentShopAtom
} from '../../data/atoms.js';

import { Form, Grid, Icon, Radio, Image, Checkbox, Divider } from 'semantic-ui-react';

const ItemDetailsContext = ({ checkOutListItem, attributes, setAttributes }) => {
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [item, setItem] = useState();
  const [quantity, setQty] = useState(1);
  // const [attributes, setAttributes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    console.log(checkOutListItem);
    checkOutListItem ? setItem(checkOutListItem) : setItem(currentItem);
  }, [checkOutListItem, currentItem]);

  const handleCheckBoxChange = (option) => {
    let attTemp = [...attributes];

    //find attribute index
    let attIndex = attributes.findIndex((attr) => attr.id === option.attribute_id);

    console.log('attIndex', attIndex);
    // new attribute
    if (attIndex === -1) {
      attTemp.push({ id: option.attribute_id, options: [option] });
    }

    // existing attribute
    else {
      console.log('existing attribute');
      // find option index
      let optIndex = attTemp[attIndex].options.findIndex((opt) => opt.id === option.id);

      // new option
      if (optIndex === -1) {
        attTemp[attIndex].options.push(option);
      }
      // existing otpion
      else {
        attTemp[attIndex].options[optIndex] = option;
      }
    }
    setAttributes(attTemp);
  };


  const handleRadioChange = (option) => {
    setChecked(prev => ({ ...prev, [option.attribute_id]: option.id }))
    let temp = [...attributes];
    let attIndex = temp.findIndex(item => item.id === option.attribute_id)
    if (!temp[0]) {
      setAttributes([{ id: option.attribute_id, options: [option] }])
    }
    else if (attIndex !== -1) {
      temp[attIndex].options = [option];
      setAttributes(temp);
    }
    else {
      temp.push({ id: option.attribute_id, options: [option] })
      setAttributes(temp);
    }
  };

  return (
    <>
      {item && (
        <Wrapper>
          <Container>
            <StoreHeader
              onClick={() => {
                // router.push('/store/' + toSlug(selectedStore.name) + '/' + selectedStore.id + '#top');
                // handleClose();
              }}>
              <Image
                src={
                  currentShop.logo
                    ? HOST_URL + '/storage/' + currentShop.logo
                    : '/avatar-placeholder.png'
                }
                avatar
                size="mini"
              />
              &nbsp;&nbsp;
              {currentShop.name}
            </StoreHeader>
            <h2>{item.name}</h2>

            {item.images && item.images[0] ? (
              <Img src={HOST_URL + '/storage/' + JSON.parse(item.images)[0]} />
            ) : (
              <Img src="/no-image.png" />
            )}

            <Description>{item.description}</Description>
            <h4>Choose your options</h4>
            <Form>
              <Form.Field></Form.Field>
              {item.attributes &&
                item.attributes[0] &&
                item.attributes.map((attribute, i) => {
                  return (
                    <div key={i}>
                      <Divider />

                      <Form.Field>
                        <h4 style={{ fontWeight: 'bold' }}>
                          {attribute.name}
                          <span style={{ color: 'grey' }}>
                            {attribute.type === 1
                              ? ' (choose one only)'
                              : ' (you can choose more than one)'}
                          </span>
                          <span style={{ color: 'red' }}>
                            {attribute.require_status === 1
                              ? ' *required'
                              : ''}
                          </span>
                        </h4>

                        {attribute.options &&
                          attribute.options[0] &&
                          attribute.options.map((option, j) => {
                            return (
                              <Grid key={j}>
                                <Grid.Column width={8}>
                                  {attribute.type === 2 ? (
                                    <Checkbox
                                      type={attribute.type === 2 ? 'checkbox' : 'radio'}
                                      label={option.option_name}
                                      name="radioGroup"
                                      // value={option.option_price}
                                      // checked={checked[option_attribite.id]}
                                      onChange={() => {

                                        // Handle UNCHECK! Uncheck if optionId is checked, remove option from attritubes array and selctedOptions
                                        // selectedOptions is used to control checkboxes
                                        if (selectedOptions.includes(option.id)) {
                                          // remove option in attributes
                                          let temp = [...attributes];
                                          let attIndex = temp.findIndex(
                                            (item) => item.id === option.attribute_id
                                          );
                                          let optIndex = temp[attIndex].options.findIndex(
                                            (item) => item.id === option.id
                                          );

                                          temp[attIndex].options.splice(optIndex, 1);

                                          if (temp[attIndex].options.length === 0) {
                                            temp.splice(attIndex, 1);
                                          }

                                          setAttributes(temp);

                                          setSelectedOptions(
                                            selectedOptions.filter((id) => id !== option.id)
                                          );
                                        } else {
                                          setSelectedOptions([...selectedOptions, option.id]);
                                          handleCheckBoxChange(option);
                                        }
                                      }}
                                    />
                                  ) : (
                                    <Radio
                                      type="radio"
                                      label={option.option_name}
                                      name={option.attribute_id.toString()}
                                      checked={checked[option.attribute_id] === option.id}
                                      onChange={() => {
                                        handleRadioChange(option);
                                      }}
                                    />
                                  )}
                                </Grid.Column>
                                <Grid.Column width={8} style={{ textAlign: 'right' }}>
                                  + ${option.option_price}
                                </Grid.Column>
                              </Grid>
                            );
                          })}
                      </Form.Field>
                    </div>
                  );
                })}
            </Form>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Container = styled.div`
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 150px;
  min-height: calc(100vh - 60px);
  width: 100%;
  max-width: 500px;
`;
const StoreHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
const Description = styled.h4`
  color: grey;
`;
const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export default ItemDetailsContext;
