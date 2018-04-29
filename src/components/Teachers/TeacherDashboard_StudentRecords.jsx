import React from 'react';
import { Table, Checkbox, Button, Icon, Segment, Grid, Divider, Modal, Header, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SetListOfStudents, SetAllClassrooms, SetCurrentClassrooms, StoreAllAssessments, SetAllLiveAssignments } from './TeacherActions';
import Promise from 'bluebird';
import _ from 'lodash';
import moment from 'moment'

export default connect((store) => {
  return {
    user_cred: store.authentication.user_cred,
    live_assignments: store.teacher.live_assignments,
    all_assessments: store.teacher.all_assessments,
    currentStudentList: store.teacher.currentStudentList ? store.teacher.currentStudentList : []
  }
})(
class TeacherDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      more_details: false,
      magnify_assessmentID: null,
      magnify_flac: null,
      magnify_transcribedText: null,
      dimmer_active: true,
      adjust_student_level: false,
      magnify_current_level: null
    }
    this.handleSort = this.handleSort.bind(this)
   // this.ViewMoreDetails = this.ViewMoreDetails.bind(this)
  // this.resetModal = this.resetModal.bind(this);
  }


  componentDidMount() {

    const{user_cred, classrooms} = this.props;


/* 

    new Promise (function(resolve, reject){

      // ** - here we iterate over the classes the teacher has
      firebase.database().ref(`teacher/${user_cred.uid}/classes`).once('value').then(function(snapshot){
        var arrayOfClasses = [];
        var currentClassroom = null;
        // How does this works, as it sores an array with the -primary content and the class content?
        snapshot.forEach(function(classes){
          arrayOfClasses.push(classes.val());
          if (!currentClassroom) {
            // does it resolve ONLY in the first classroom that it finds?
            currentClassroom = classes.val();
            // console.log(currentClassroom);
            resolve(currentClassroom);
            firebase.database().ref(`/classes/${currentClassroom}`).once('value').then(function(snapshot){
              if (snapshot.val()){
                this.props.dispatch(SetCurrentClassrooms(snapshot.val()));
              }
            }.bind(this))
          }
        }.bind(this));
        this.props.dispatch(SetAllClassrooms(arrayOfClasses));
      }.bind(this))
    }.bind(this))
    .then(function(currentClassroom){



 */ // Promise commented out temporarily

    // this commented out from orginal change
    // firebase.database().ref(`assignment`).orderByChild('courseID').equalTo(currentClassroom).once('value')

    // changed assignment to STUDENT

      firebase.database().ref(`student`).once('value')
      .then(function(snapshot){

        if (snapshot.val()) {
          var allLiveSTUDENTS = [];
          snapshot.forEach(function(STUDENT){

            const gmailUid = STUDENT.key;
            const fullName = STUDENT.val().default_profile.name.fullName;
            const firstName = STUDENT.val().default_profile.name.givenName;
            const lastName = STUDENT.val().default_profile.name.familyName;
            const currentFluencyScore = STUDENT.val().academicRecord ? STUDENT.val().academicRecord.currentReadingLevel : "NO DATA";
            
            var obj = {
              fullName,
              firstName,
              lastName,
              gmailUid,
              currentFluencyScore
            }

            allLiveSTUDENTS.push(obj);

          });

          // update store
          this.props.dispatch(SetListOfStudents(allLiveSTUDENTS));
        }
      }.bind(this))
    //}.bind(this))
  }
 


/* 
  ViewMoreDetails(student, assessmentID, flac_info, transcribedText) {
    this.setState({
      magnify_student: student,
      magnify_assessmentID: assessmentID,
      magnify_flac: flac_info,
      magnify_transcribedText: transcribedText,
      more_details: true
    })
  } */

/* 
  resetModal() {
    this.setState({
      magnify_student: null,
      magnify_assessmentID: null,
      magnify_flac: null,
      magnify_transcribedText: null,
      more_details: false, 
      adjust_student_level: false,
      magnify_current_level: "na"
    })
  } */

  handleSort(clickedColumn) {
    const { column, direction } = this.state
    const {currentStudentList} = this.props;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending'
      })
      this.props.dispatch(SetListOfStudents(_.sortBy(currentStudentList, [clickedColumn])));
      return
    }

    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })

    this.props.dispatch(SetListOfStudents(currentStudentList.reverse()));
  }




  render() {

    const { currentStudentList, all_assessments, live_assignments, user_cred} = this.props;
    console.log(currentStudentList);

    const { column, direction, more_details, 
      magnify_student, 
      magnify_assessmentID,
      magnify_flac, 
      magnify_transcribedText, 
      adjust_student_level,
      magnify_current_level 
    } = this.state;

    return (
      <Segment vertical>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={15}>
            <h3>Student Records</h3>
              <Table celled sortable>
                <Table.Header>


                  <Table.Row>
                    <Table.HeaderCell sorted={column === 'last_name' ? direction : null } onClick={()=>{this.handleSort('last_name')}}>Last</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'first_name' ? direction : null } onClick={()=>{this.handleSort('first_name')}}>First</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'current_level' ? direction : null} onClick={() => { this.handleSort('current_level') }}>Current Level</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'current_wpm' ? direction : null} onClick={() => { this.handleSort('current_wpm')}}>WPM</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'most_recent_recording' ? direction : null} onClick={() => { this.handleSort('most_recent_recording')}} >Most Recent Recording</Table.HeaderCell>
                  </Table.Row>

                </Table.Header>
                <Table.Body>
                  {currentStudentList.map((studentRecord, key)=>{
  
                    return (
                      <Table.Row key={key}>

                        <Table.Cell>
                          <Segment vertical style={{ padding: '0px' }}>
                            {studentRecord.lastName}
                          </Segment>
                        </Table.Cell>

                        <Table.Cell>
                          <Segment vertical style={{ padding: '0px' }}>
                            {studentRecord.firstName}
                          </Segment>
                        </Table.Cell>

                        <Table.Cell>
                            {studentRecord.currentFluencyScore}    
                        </Table.Cell>

                        <Table.Cell>{studentRecord.gmailUid}</Table.Cell>
 
                        <Table.Cell>coming</Table.Cell>

                      </Table.Row>
                    )
                  })}


                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid> 








      </Segment>
      )
    }
});




/* 

componentDidMount() {
  const { user_cred, classrooms } = this.props;



  firebase.database().ref(`assessments`).orderByKey().once('value').then(function (snapshot) {
    this.props.dispatch(StoreAllAssessments(snapshot.val()))
  }.bind(this))
  new Promise(function (resolve, reject) {

    firebase.database().ref(`teacher/${user_cred.uid}/classes`).once('value').then(function (snapshot) {
      var arrayOfClasses = [];
      var currentClassroom = null;
      // How does this works, as it sores an array with the -primary content and the class content?
      snapshot.forEach(function (classes) {
        arrayOfClasses.push(classes.val());
        if (!currentClassroom) {
          // does it resolve ONLY in the first classroom that it finds?
          currentClassroom = classes.val();
          // console.log(currentClassroom);
          resolve(currentClassroom);
          firebase.database().ref(`/classes/${currentClassroom}`).once('value').then(function (snapshot) {
            if (snapshot.val()) {
              this.props.dispatch(SetCurrentClassrooms(snapshot.val()));
            }
          }.bind(this))
        }
      }.bind(this));
      this.props.dispatch(SetAllClassrooms(arrayOfClasses));
    }.bind(this))
  }.bind(this))
    .then(function (currentClassroom) {
      // firebase.database().ref(`assignment`).orderByChild('courseID').equalTo(currentClassroom).once('value')


      // what us happening above?
      // NEXT: ITERATE THROUGH 'STUDENT' 
      // MAYBE JUST REWRITE componentDidMount?


      firebase.database().ref(`assignment`).once('value')
        .then(function (snapshot) {
          if (snapshot.val()) {
            var allLiveAssignments = [];
            snapshot.forEach(function (assignment) {
              var assignmentId = assignment.key;
              var results = assignment.val().results;

              // gmailUid
              var gmailUid = assignment.val().gmailUid ? assignment.val().gmailUid : null;
              console.log("gmailUid--->", gmailUid)

              var score = (results) ? results.scoreFromCompareWord : null;
              var flacFile = (results) ? results.publicFlacURL : null;
              var wordsPerMinute = (results) ? results.transcribedWordsPerMinute : null;
              var numOfRecordingSeconds = (results) ? results.numOfRecordingSeconds : null;
              var timeStamp = (results) ? results.timeStamp : null;
              var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              var strDate = null;
              if (timeStamp) {
                timeStamp = Number(timeStamp);
                var date = new Date(timeStamp);
                strDate = months[date.getMonth()] + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();
              }
              var obj = {
                assignmentId,
                gmailUid, // new!
                email: assignment.val().studentInfo.emailAddress,
                name: assignment.val().studentInfo.name.fullName,
                assessment: assignment.val().assessment,
                status: (results) ? results.status : 'Not started',
                score: (score !== undefined && score !== null) ? (score) : null,
                flac: (flacFile) ? (<audio controls preload='auto'><source src={flacFile} type="audio/flac" /></audio>) : null,
                wordsPerMinute: (wordsPerMinute !== undefined && wordsPerMinute !== null) ? wordsPerMinute : null,
                numOfRecordingSeconds: (numOfRecordingSeconds !== undefined && numOfRecordingSeconds !== null) ? numOfRecordingSeconds : null,
                timeStamp: (timeStamp !== undefined && timeStamp !== null) ? timeStamp : null,
                strDate: (strDate !== undefined && strDate !== null) ? strDate : null,
                transcribedText: (assignment.val().results) ? assignment.val().results.transcribedText : null
              }
              if (results) {
                if (results.scoreFromFuzzySet) {
                  obj['scoreFromFuzzySet'] = results.scoreFromFuzzySet;
                }
              }
              allLiveAssignments.push(obj);
            });
            this.props.dispatch(SetAllLiveAssignments(allLiveAssignments));
          }
        }.bind(this))
    }.bind(this))
}
 */