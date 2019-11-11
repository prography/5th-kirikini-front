import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const Summary = props => {
  return (
    <View style={styles.container}>
      <View style={styles.monthWeekButtonContiner}>
        <View style={styles.monthButton}>
          <Text style={styles.text}>11월</Text>
        </View>
        <View style={styles.weekButtonContainer}>
          <View style={styles.weekButton}>
            <Text style={styles.text}>1</Text>
          </View>
          <View style={styles.weekButton}>
            <Text style={styles.text}>2</Text>
          </View>
          <View style={styles.weekButton}>
            <Text style={styles.text}>3</Text>
          </View>
          <View style={styles.weekButton}>
            <Text style={styles.text}>4</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.summaryButton}
          onPress={() => props.navigation.navigate('WeeklyList')}>
          <Text style={styles.text}>WeeklyList</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryButton}>
          <Text style={styles.text}>
            WeeklyReport {'\n'}will be updated after 11.30
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryButton}>
          <Text style={styles.text}>
            MonthlyList{'\n'}will be updated after 11.30
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryButton}>
          <Text style={styles.text}>
            MonthlyReport {'\n'}will be updated after 11.30
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthWeekButtonContiner: {
    flex: 1,
    alignItems: 'center',
  },
  monthButton: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 100,
    backgroundColor: '#7BB78E',
  },
  weekButtonContainer: {
    width: 300,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#B5DCA4',
  },
  buttonContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryButton: {
    width: 300,
    height: 100,
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#7BB78E',
    borderRadius: 60,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
  },
});
export default Summary;
