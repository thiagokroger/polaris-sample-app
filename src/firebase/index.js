import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAqtKrQQFa7b5Zr7AKMbM0yuS8C6f7g97c',
  authDomain: 'study-todo-list.firebaseapp.com',
  databaseURL: 'https://study-todo-list.firebaseio.com',
  projectId: 'study-todo-list',
  storageBucket: 'study-todo-list.appspot.com',
  messagingSenderId: '25893593139',
  appId: '1:25893593139:web:89f72ebc8e3fdd8d704346',
  measurementId: 'G-7PLSRFJSHZ'
}

firebase.initializeApp(firebaseConfig)
