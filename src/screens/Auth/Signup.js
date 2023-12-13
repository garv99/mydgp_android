import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { showToast } from '../../helpers/ShowToast';
import RouteNames from '../../routes/RouteNames';
import { EnterDetailsOPTPRegistration, clearErrors } from '../../actions/UserActions';
import AuthHeader from '../../components/Auth/AuthHeader';
import AuthStyles from '../../styles/AuthStyles';
import InputGroup from '../../components/InputGroup';
import Btn from '../../components/Btn';
import Loader from '../../components/Loader';
import { getAllServices } from '../../actions/ServiceActions';
import DropDown from '../../components/Dropdown';

export default function Signup({navigation, route}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [service, setService] = useState()
  const [isServiceOpen, setServiceOpen] = useState(false)
  const [allServices, setAllServices] = useState([])

  // const contactNumber = route.params.contactNumber;
  const contactNumber = 8307747802

  const dispatch = useDispatch();
  const {error, isAuthenticated, loading} = useSelector(state => state.user);
  const {services} = useSelector(state => state.services)

  useEffect(() => {
    // if(services.length === 0)
      dispatch(getAllServices())

    console.log("---------------------------------", services)
  
    if (isAuthenticated) {
      showToast('success', 'User Registration Successful');
      navigation.reset({index: 1, routes: [{name: RouteNames.HOME}]});
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
    console.log(services)
  }, [dispatch, error, isAuthenticated]);

  const signupHandler = () => {
    dispatch(EnterDetailsOPTPRegistration({name, email, contactNumber}));
  };

  return (
    <View>
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
      <Btn onClick={signupHandler} label="SIGNUP" />
    </View>
  </View>
  );
}
