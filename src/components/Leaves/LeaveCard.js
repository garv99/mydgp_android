import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../../helpers/Colors';
import ComponentStyles from '../../styles/ComponentStyles';
import {getDate} from '../../utils/DateTime';
import Enums from '../../helpers/Enums';
import ShowInfo from '../ShowInfo';
import Badge from '../Badge';

export default function LeaveCard({leave, status}) {
  return (
    <View
      style={[
        ComponentStyles.cardContainer,
        ComponentStyles.horizontalBetweenAlgin,
        {alignItems: 'flex-start', paddingRight: 10},
      ]}>
      <View>
        <ShowInfo title="Start Date" info={getDate(leave.startDate)} />
        <ShowInfo title="End Date" info={getDate(leave.endDate)} />
        <ShowInfo title="Days" info={leave.days} />
        <ShowInfo title="Reason" info={leave.reason || 'N/A'} />
      </View>

      <Badge
        title={status}
        color={
          status === Enums.LEAVE_STATUS.REJECTED ? Colors.WHITE : Colors.BLACK
        }
        bgColor={
          status === Enums.LEAVE_STATUS.PENDING
            ? Colors.YELLOW
            : status === Enums.LEAVE_STATUS.APPROVED
            ? Colors.GREEN
            : Colors.RED
        }
      />
    </View>
  );
}
