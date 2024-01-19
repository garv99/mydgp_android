import {View, Text, StyleSheet, FlatList, ScrollView, LogBox} from 'react-native';
import React from 'react';
import CTABtn from '../components/CTABtn';
import Colors from '../helpers/Colors';
import {useState} from 'react';
import Modal from 'react-native-modal';
import DatePickerModal from 'rn-modal-date-picker';
import ComponentStyles from '../styles/ComponentStyles';
import {getDate} from '../utils/DateTime';
import InputGroup from '../components/InputGroup';
import Btn from '../components/Btn';
import {useDispatch, useSelector} from 'react-redux';
import {applyLeave, clearErrors, getAllLeaves} from '../actions/LeaveActions';
import {useEffect} from 'react';
import {showToast} from '../helpers/ShowToast';
import Loader from '../components/Loader';
import Enums from '../helpers/Enums';
import LeaveCard from '../components/Leaves/LeaveCard';

export default function Leaves() {
  const dispatch = useDispatch();
  const {loading, isApplied, error} = useSelector(state => state.leave);
  const {
    loading: leavesLoading,
    error: leavesError,
    leaves: allLeaves,
  } = useSelector(state => state.allLeaves);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [isStartDateModalOpen, setIsStartDateModalOpen] = useState(false);
  const [isEndDateModalOpen, setIsEndDateModalOpen] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    dispatch(getAllLeaves());

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    if (leavesError) {
      showToast('error', leavesError);
      dispatch(clearErrors());
    }

    if (isApplied) {
      showToast('success', 'Leave Applied!');
    }
  }, [isApplied, error]);

  const submitHandler = () => {
    let days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24) + 1); // milliseconds to days + 1
    dispatch(applyLeave({endDate, startDate, days, reason}));
    setIsModalOpen(!isModalOpen);
  };

  const ShowLeaves = ({status}) => {
    let leaves = allLeaves.filter(
      leave => leave._id === status,
    )[0];

    return (
      <View style={styles.leaveContainer}>
        <Text style={styles.leaveHeading}>{leaves?._id}</Text>
        <FlatList
        contentContainerStyle={styles.flatlist}
          data={leaves?.leaves}
          renderItem={({item}) => <LeaveCard leave={item} status={leaves?._id} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return loading || leavesLoading ? (
    <Loader />
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{alignItems: 'flex-end', marginRight: 22}}>
        <CTABtn
          label="Apply Leave"
          onClick={() => setIsModalOpen(!isModalOpen)}
          bgColor={Colors.PRIMARY}
          color={Colors.WHITE}
        />
      </View>

      <ShowLeaves status={Enums.LEAVE_STATUS.PENDING} />
      <ShowLeaves status={Enums.LEAVE_STATUS.APPROVED} />
      <ShowLeaves status={Enums.LEAVE_STATUS.REJECTED} />

      {/* Apply for a Leave Modal */}
      <Modal
        isVisible={isModalOpen}
        backdropOpacity={0.5}
        onBackdropPress={() => setIsModalOpen(!isModalOpen)}
        onBackButtonPress={() => setIsModalOpen(!isModalOpen)}>
        <View style={{backgroundColor: Colors.WHITE, padding: 22}}>
          <Text
            style={[
              styles.textBold,
              {fontSize: 28, textAlign: 'center', marginBottom: 16},
            ]}>
            Apply a Leave
          </Text>
          <InputGroup
            placeholder="Reason for the leave"
            value={reason}
            label="Reason"
            onChange={val => setReason(val)}
          />
          <View style={ComponentStyles.horizontalEvenlyAlgin}>
            <View
              style={{alignItems: 'center', width: '100%', marginRight: -46}}>
              <CTABtn
                icon="pencil-outline"
                iconColor={Colors.WHITE}
                label="Start Date"
                bgColor={Colors.PRIMARY}
                color={Colors.WHITE}
                onClick={() => setIsStartDateModalOpen(!isStartDateModalOpen)}
              />
              <Text style={styles.date}>{getDate(startDate)}</Text>
            </View>

            <View style={{alignItems: 'center', width: '100%'}}>
              <CTABtn
                icon="pencil-outline"
                iconColor={Colors.WHITE}
                label="End Date"
                bgColor={Colors.PRIMARY}
                color={Colors.WHITE}
                onClick={() => setIsEndDateModalOpen(!isEndDateModalOpen)}
              />
              <Text style={styles.date}>{getDate(endDate)}</Text>
            </View>
          </View>

          <Btn label="Apply" onClick={submitHandler} />
        </View>
      </Modal>

      <DatePickerModal
        date={startDate}
        setDate={date => {
          setStartDate(date);
          setIsStartDateModalOpen(false);
        }}
        onHideModal={() => setIsStartDateModalOpen(false)}
        isVisible={isStartDateModalOpen}
        mainColor={Colors.PRIMARY}
        contrastColor={Colors.WHITE}
        fontFamily="PublicSans_Light"
        disablePast={true}
      />

      <DatePickerModal
        date={endDate}
        setDate={date => {
          setEndDate(date);
          setIsEndDateModalOpen(false);
          console.log("-----------------", date, "================")
        }}
        onHideModal={() => setIsEndDateModalOpen(false)}
        isVisible={isEndDateModalOpen}
        mainColor={Colors.PRIMARY}
        contrastColor={Colors.WHITE}
        fontFamily="PublicSans_Light"
        disablePast={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
  },
  leaveContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  leaveHeading: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  flatlist: {
    paddingVertical: 10,
    paddingHorizontal: 5
  }
});
