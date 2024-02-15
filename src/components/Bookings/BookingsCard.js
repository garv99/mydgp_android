import React, {useState} from 'react';
import {Text, View} from 'react-native';
import ShowInfo from '../ShowInfo';
import ComponentStyles from '../../styles/ComponentStyles';
import {getDate} from '../../utils/DateTime';
import SubHeading from '../BookingRequests/SubHeading';
import Colors from '../../helpers/Colors';
import Badge from '../Badge';
import DropDown from '../../components/Dropdown';
import Btn from '../Btn';
import Enums from '../../helpers/Enums';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../Loader';
import {updateBookingStatus} from '../../actions/BookingsActions';
import {useEffect} from 'react';
import {showToast} from '../../helpers/ShowToast';
import {CLEAR_ERRORS} from '../../constants/BookingsConstants';

const BookingsCard = ({booking, showUpdateStatus}) => {
  const dispatch = useDispatch();
  const {error, loading, isUpdated} = useSelector(
    state => state.updateBookingStatus,
  );

  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
  const [status, setStatus] = useState('');
  const statuses =
    booking.status === Enums.BOOKING_STATUS.ACCEPTED
      ? [
          {
            label: Enums.BOOKING_STATUS.ONGOING,
            value: Enums.BOOKING_STATUS.ONGOING,
          },
        ]
      : [
          {
            label: Enums.BOOKING_STATUS.CLOSED,
            value: Enums.BOOKING_STATUS.CLOSED,
          },
        ];

  const updateStatusHandler = () => {
    dispatch(updateBookingStatus(booking._id, status));
  };

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch({type: CLEAR_ERRORS});
    } else if (isUpdated) {
      showToast('success', 'Booking Status Updated');
    }
  }, [error, isUpdated]);

  return loading ? (
    <Loader />
  ) : (
    <View style={ComponentStyles.cardContainer}>
      <View
        style={[
          ComponentStyles.horizontalBetweenAlgin,
          {alignItems: 'flex-start', paddingRight: 10},
        ]}>
        <View>
          <ShowInfo title="Id" info={booking?._id} boldInfo={true} />
          <ShowInfo title="Date" info={getDate(booking?.date)} />
          <ShowInfo
            title="Time"
            info={`${booking?.hours} ${
              booking?.hours === 1 ? 'hour' : 'hours'
            }`}
          />

          <SubHeading
            styles={{paddingHorizontal: 10}}
            heading="Customer Info"
          />
          <View style={{paddingHorizontal: 10}}>
            <ShowInfo title="Name" info={booking.customer.name} />
            <ShowInfo
              title="Contact Number"
              info={booking.customer.contactNumber}
            />
          </View>

          <SubHeading styles={{paddingHorizontal: 10}} heading="Address" />
          <View style={{paddingHorizontal: 10}}>
            <ShowInfo title="Address" info={`${booking.address.address}`} />
            <ShowInfo
              title="City"
              info={`${booking.address.city}, ${booking.address.state}`}
            />
            <ShowInfo title="Pincode" info={booking.address.pincode} />
          </View>
        </View>

        <View>
          {showUpdateStatus ? (
            <Badge title={`₹ ${booking.status}`} bgColor={Colors.YELLOW} />
          ) : null}
          {/* <Badge title={`₹ ${booking.totalPrice}`} bgColor={Colors.GREEN} /> */}
        </View>
      </View>
      {showUpdateStatus ? (
        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <DropDown
            label="Update Status"
            value={status}
            setValue={val => setStatus(val)}
            items={statuses}
            open={isStatusUpdateOpen}
            setIsOpen={() => setIsStatusUpdateOpen(!isStatusUpdateOpen)}
            placeholder="------- Update Status -------"
            zIndex={2}
          />
          <Btn label="Submit" onClick={updateStatusHandler} />
        </View>
      ) : null}
    </View>
  );
};

export default BookingsCard;
