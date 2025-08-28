import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import theme from "./Theme";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTextInput: {
        width: '100%',
        marginVertical: 12,
    },
    splashImage: {
        width: width,
        height: height,
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80
    },
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: "#121212" ,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        opacity: 1,
    },
    activityIndicatorWrapper: {
        backgroundColor: 'rgba(255,255,255,0)',
        height: 125,
        width: 125,
        borderRadius: 10,
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    imageLogo: {
        width: 350,
        height: 110,
        marginBottom: -15,
    },
    buttonLogin: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
    twoButtonHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginRight: 10
    },
    profileText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25/2,
        backgroundColor:'white',
        marginLeft: 10,

    },
    searchContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchResultsContainer: {
        width: Dimensions.get('window').width,
        flex: 9
    },
    statusBarBackground: {
        color: "#BB86FC"
    },
    searchBarContainer: {
        width: Dimensions.get('window').width - 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginVertical: 10,
        flex: 1
    },
    textInputSearch: {
        flex: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        height: 40,
        paddingLeft: 10
    },
    textSearchButton: {
        flex: 1,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 40
    },
    progressText: {
        color: "#505050",
        fontWeight: "bold",
    },
    progress: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        opacity: 0.4
    },
    headline: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
    },
    topBox: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderColor: "gray",
        borderRadius: 10,
  },
})

export default styles;
