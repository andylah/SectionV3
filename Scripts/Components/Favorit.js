import {Component} from "react";
import FavoritScreen from "../Screens/FavoritScreen";
import {PermissionsAndroid, Platform, ToastAndroid, View} from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";
import {PDF_URL} from "../Assets/Konstanta";
import ProgressBar from "../Screens/screenComponent/ProgressBar";
import SearchBar from "../Screens/screenComponent/searchBar";
import Loader from "../Screens/screenComponent/Loader";
import styles from "../Assets/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Favorit extends Component{
    constructor(props) {
        super();
        this.state = {
            username:'',
            dataAlmi:[],
            dataAlmiFilter:[],
            isLoading: false,
            visible: false,
            percent: 0
        }
    }

    _loadFavorit = () =>{
        this.setState({
            isLoading: true
        },async ()=>{
            await AsyncStorage.multiGet(['section','username'], (err, result)=>{
                this.setState({
                    dataAlmi: JSON.parse(result[0][1]),
                    dataAlmiFilter: JSON.parse(result[0][1]),
                    username: result[1][1]
                },()=>{
                    this.props.navigation.setParams({
                        userLogin: this.state.username.substring(0,1).toUpperCase()
                    })
                })
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus',()=>{
            this._loadFavorit()
        })
        this._loadFavorit()
    }

    componentWillUnmount() {
        this.focusListener()
    }
    showProgress = () =>{
        this.setState({visible: true})
    }

    hideProgress = () =>{
        this.setState({visible: false})
    }

    removeFavorit = async (item) =>{
        const section = await AsyncStorage.getItem('section')
        if(section.includes(item.section)){
            const sectionArr = JSON.parse(section);
            const result = sectionArr.filter(el=>el.section != item.section)
            await AsyncStorage.setItem('section', JSON.stringify(result))
            this.setState({
                dataAlmi: result,
                dataAlmiFilter: result
            }, ()=>{
                ToastAndroid.showWithGravityAndOffset(
                    "Section "+item.section+" berhasil di hapus dari favorit.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            })
        }else{
            ToastAndroid.showWithGravityAndOffset(
                "Section "+item.section+" tidak bisa di temukan.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }

    downloadFavorit = async(section) =>{
        let androidVersion = Platform.constants['Release'];
        let granted;
        ToastAndroid.showWithGravityAndOffset(
            "Downloading section "+section+" ...",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        if (androidVersion > 10){
            granted = PermissionsAndroid.RESULTS.GRANTED;
        }else{
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
                    title: "Ijin Penyimpanan",
                    message: 'Aplikasi membutuhkan ijin untuk mendownload file',
                    buttonNegative: 'Batal',
                    buttonPositive: 'Baik',
                }
            );
        }
        try{
            if (granted === PermissionsAndroid.RESULTS.GRANTED){
                this.showProgress()
                let downloadDir = ReactNativeBlobUtil.fs.dirs.DownloadDir
                let file = section+'.pdf'
                try {
                    ReactNativeBlobUtil.config({
                        path: downloadDir + '/' + file,
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            mime: 'application/pdf',
                            description: 'Downloading Section No. ' + section,
                            path: downloadDir + '/' + file
                        }
                    }).fetch('GET', PDF_URL + '/' + section + '.pdf', {'Cache-Control': 'no-store'})
                        .progress({count: 10},(received, total) => {
                            this.setState({
                                percent:(received/total)*100
                            })
                        })
                        .then((result) => {
                            this.hideProgress()
                            ReactNativeBlobUtil.android.actionViewIntent(result.path(), 'application/pdf')
                        })
                        .catch((e) => {
                            ToastAndroid.showWithGravityAndOffset(
                                "Download file error, ERROR CODE :" + e.message,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                            );
                            this.hideProgress()
                            console.log('Download file error, ERROR CODE :', e.message)
                        });
                }catch (e){
                    console.log(e)
                }
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    "Anda perlu mengijinkan aplikasi untuk mengunduh file.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }

        }catch (err){
            ToastAndroid.showWithGravityAndOffset(
                "Error, terjadi kesalahan pada server.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            console.log(e.message)
        }
    }
    searching = (term) =>{
        let dataAlmi= this.state.dataAlmi
        const result = dataAlmi.filter(function(da){
            const sectionNo = da.section.toUpperCase().replace(/\s/g, '');
            const sectionApp = da.application.toUpperCase().replace(/\s/g, '');
            const sectionClient = da.client.toUpperCase().replace(/\s/g, '');

            const searchTerm = term.toUpperCase().replace(/\s/g, '');

            return sectionNo.indexOf(searchTerm) > -1 || sectionApp.indexOf(searchTerm) > -1 || sectionClient.indexOf(searchTerm) > -1
        })

        if(result.length == 0){
            ToastAndroid.showWithGravityAndOffset(
                "Pencarian tidak menemukan hasil ...",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }else{
            this.setState({
                dataAlmiFilter: result,
            })
        }
    }

    render(){
        return(
            <View style={styles.searchContainer}>
                <ProgressBar progress={this.state.percent} loading={this.state.visible}/>
                <SearchBar onPress={this.searching}/>
                <Loader loading={this.state.isLoading}/>
                <FavoritScreen data={this.state.dataAlmiFilter}
                    removeFavorit={this.removeFavorit}
                    downloadFavorit={this.downloadFavorit}
                />
            </View>
        )
    }
}

export default Favorit;
