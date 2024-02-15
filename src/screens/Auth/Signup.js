import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showToast} from '../../helpers/ShowToast';
import RouteNames from '../../routes/RouteNames';
import {
  EnterDetailsOPTPRegistration,
  clearErrors,
} from '../../actions/UserActions';
import AuthHeader from '../../components/Auth/AuthHeader';
import AuthStyles from '../../styles/AuthStyles';
import InputGroup from '../../components/InputGroup';
import Btn from '../../components/Btn';
import {getAllServices} from '../../actions/ServiceActions';
import DropDown from '../../components/Dropdown';
import Enums from '../../helpers/Enums';
import DocUploader from '../../components/DocUploader';

export default function Signup({navigation, route}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [service, setService] = useState();
  const [image, setImage] = useState();
  const [isServiceOpen, setServiceOpen] = useState(false);
  const contactNumber = route.params.contactNumber;

  const dispatch = useDispatch();
  const {error, isAuthenticated, loading} = useSelector(state => state.user);
  const {services} = useSelector(state => state.services);

  useEffect(() => {
    dispatch(getAllServices());

    if (isAuthenticated) {
      showToast('success', 'User Registration Successful');
      navigation.reset({index: 1, routes: [{name: RouteNames.DRAWERS.HOME}]});
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated]);

  const signupHandler = () => {
    // if (!image) {
    //   showToast("error", "Profile picture is required")
    //   return
    // }

    dispatch(
      EnterDetailsOPTPRegistration({
        name,
        email,
        contactNumber,
        service,
        role: Enums.USER_ROLES.SERVICE_PROVIDER,
        image,
      }),
    );
  };

  return (
    <ScrollView>
      <AuthHeader />
      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.heading}>ENTER DETAILS</Text>
        <InputGroup
          label="Enter Name"
          placeholder="Your Name"
          value={name}
          onChange={val => setName(val)}
        />
        <InputGroup
          label="Enter Your Email"
          placeholder="yourmail@gmail.com"
          value={email}
          onChange={val => setEmail(val)}
          type="email-address"
        />
        <InputGroup
          label="Contact Number"
          value={contactNumber}
          editable={false}
        />
        <DropDown
          label="Services"
          value={service}
          setValue={val => setService(val)}
          items={services}
          open={isServiceOpen}
          // onChangeValue={upadteCitiesGroup}
          setIsOpen={() => setServiceOpen(!isServiceOpen)}
          placeholder="Select Your Service"
          zIndex={2}
        />
        <DocUploader
          document={image}
          setDocument={setImage}
          title="Select Profile Picture"
        />
        <Btn onClick={signupHandler} label="SIGNUP" />
      </View>
    </ScrollView>
  );
}
