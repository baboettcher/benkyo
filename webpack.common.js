const path = require('path');

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");

module.exports = {
  entry:  [
            './src/components/NavigationHeader.jsx',
            './src/components/VerifyRole/VerifyRole.jsx',
            './src/components/Teachers/Login/TeacherLogin.jsx',
            './src/components/Teachers/TeacherDashboard.jsx',
            './src/components/Teachers/AssignAssessment.jsx',
            './src/components/Teachers/ClassroomByGoogle.jsx',
            './src/components/Students/Login/StudentLogin.jsx',
            './src/components/Students/Recording/AssessmentRecording.jsx',
            './src/components/Students/StudentDashboard.jsx',
            './src/components/App.jsx',
            './src/index.js'
          ],
  output: {
    filename: 'bundle.js',
    path: __dirname,
    publicPath: '/' // added to allow page refresh on RR routes
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },// added to allow page refresh on RR routes
  node: {
   fs: "empty"
  }
};