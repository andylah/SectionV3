import {Component} from "react";
import KategoriDetailScreen from "../Screens/KategoriDetailScreen";
import {PermissionsAndroid, Platform, ToastAndroid, View} from "react-native";
import Loader from "../Screens/screenComponent/Loader";
import ProgressBar from "../Screens/screenComponent/ProgressBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBlobUtil from "react-native-blob-util";
import {PDF_URL} from "../Assets/Konstanta";

class KategoriDetail extends Component{
    constructor(props) {
        super();
        this.state = {
            isLoading: false,
            downloadProgress: 0,
            modalVisible: false,
            client:'',
            dataSectionFiltered:[]
        }
    }

    _prosesFilter = (client) =>{
        this.setState({isLoading: true},()=>{
            const filtered = this.props.navigation.getState().routes[1].params.dataAluminium.filter((dt)=>{
                return dt.client == client;
            })
            this.setState({
                dataSectionFiltered: filtered,
                client: client,
                isLoading: false,
            })
        })
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', ()=>{
            this._prosesFilter(this.props.navigation.getState().routes[1].params.client)
        })
        this._prosesFilter(this.props.navigation.getState().routes[1].params.client)
    }
    componentWillUnmount() {
        this.focusListener()
    }
    _longPress = async (almi) =>{
        try{
            let sectionLama = await AsyncStorage.getItem('section');
            if (sectionLama != null){
                if(sectionLama.includes(almi.section)){
                    ToastAndroid.showWithGravityAndOffset(
                        "Section "+almi.section+" sudah ada di tab favorit.",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }else{
                    let sectionSTR = JSON.parse(sectionLama)
                    sectionSTR.push(almi)
                    await AsyncStorage.setItem('section', JSON.stringify(sectionSTR));
                    ToastAndroid.showWithGravityAndOffset(
                        "Section "+almi.section+" berhasil di tambahkan ke tab favorit.",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
            }else{
                let data = [];
                data.push(almi)
                await AsyncStorage.setItem('section', JSON.stringify(data));
                ToastAndroid.showWithGravityAndOffset(
                    "Section "+almi.section+" berhasil di tambahkan ke tab favorit.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }catch (e){
            console.log(e)
        }
    }

    _download = async (section) =>{
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

    render(){
        return(
            <View>
                <ProgressBar progress={this.state.downloadProgress} loading={this.state.modalVisible}/>
                <Loader loading={this.state.isLoading}/>
                <KategoriDetailScreen data={this.state.dataSectionFiltered}
                  LongPress={this._longPress}
                  download={this._download}
                />
            </View>
        )
    }
}

export default KategoriDetail;
