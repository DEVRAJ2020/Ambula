import React, { useCallback, useState } from 'react';
import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";


const WIDTH = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height;

export const CompData = [{  // Demo data from API 
    "name": "Login ABHA", "ButtonDirection": "left",
    "Text": "Access India's digital ecosystem with ABHA address",
    "buttonTxt": "Login now",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxz0dprHxdA353r22Lzrjz6kjlG284V9_ng&s"
},
{
    "name": "Know more about ABHA", "ButtonDirection": "right",
    "Text": "Securely Manage health data and access india's digital health ecosystem easily",
    "buttonTxt": "Know more",
    "image": "https://png.pngtree.com/png-clipart/20231006/original/pngtree-doctor-with-stethoscope-cartoon-png-image_13128822.png"
},
{
    "name": "Buy Health Insurance", "ButtonDirection": "left",
    "Text": "Securely Manage health data and access india's digital health ecosystem easily",
    "buttonTxt": "Know more",
    "image":
        "https://www.bajajallianz.com/content/dam/bagic/index/international-health-insurance.png"
},
{
    "name": "Know more about ABHA", "ButtonDirection": "right",
    "Text": "Securely Manage health data and access india's digital health ecosystem easily",
    "buttonTxt": "Know more",
    "image": "https://png.pngtree.com/png-clipart/20231006/original/pngtree-doctor-with-stethoscope-cartoon-png-image_13128822.png"
},
{
    "name": "Buy Health Insurance", "ButtonDirection": "left",
    "Text": "Securely Manage health data and access india's digital health ecosystem easily",
    "buttonTxt": "Know more",
    "image":
        "https://www.bajajallianz.com/content/dam/bagic/index/international-health-insurance.png"
},
{
    "name": "Know more about ABHA", "ButtonDirection": "right",
    "Text": "Securely Manage health data and access india's digital health ecosystem easily",
    "buttonTxt": "Know more",
    "image": "https://png.pngtree.com/png-clipart/20231006/original/pngtree-doctor-with-stethoscope-cartoon-png-image_13128822.png"
},
{
    "name": "Know more about ABHA", "ButtonDirection": "right",
    "Text": "Securely Manage health data and access india's digital health ecosystem easily",
    "buttonTxt": "Know more",
    "image": "https://png.pngtree.com/png-clipart/20231006/original/pngtree-doctor-with-stethoscope-cartoon-png-image_13128822.png"
},
]
export const CardData1 = [{ "name": "create ABHA", "image": "https://images.thequint.com/thequint%2F2022-10%2Faa250444-7b1f-4672-9010-4fd38d8de583%2FABHA_ID.png" },
{ "name": "My Health Records", "image": "data:image/png;base64,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" },
{ "name": "Scan For OPD Booking", 'image': "https://e7.pngegg.com/pngimages/574/710/png-clipart-qr-code-barcode-scanner-2d-code-qr-codewebsite-miscellaneous-blue.png" }]
export const CardData2 = [{ "name": "Doctor Appointement", "image": "https://www.crushpixel.com/static18/preview2/stock-photo-pharmacy-doctor-plus-logo-3033096.jpg" },
{ "name": "Book Lab Test", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GTLG_dNsDK5k5pW58ow0V_F0LntAG5q6ig&s" },
{ "name": "Health Insurance", 'image': "https://w7.pngwing.com/pngs/400/750/png-transparent-health-insurance-health-care-life-insurance-others-blue-logo-insurance.png" },
{ "name": "Order Medicines", "image": "https://cdn-icons-png.flaticon.com/256/5344/5344237.png" },
{ "name": "Book Home Care", "image": "https://e7.pngegg.com/pngimages/276/370/png-clipart-nursing-home-health-care-home-care-service-occupational-health-nursing-surgery-nurse-icon.png" },
{ "name": "Book Ambulance", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKdu_-CXF7iTr7UaRwhSbR7ydGQ0HFRPoxOg&s" },]


export const Header = () => {
    return (<>
        <View style={{ height: 65, width: WIDTH, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: '#dbd7d2' }}>
            <View style={{ height: WIDTH * 0.12, width: WIDTH * 0.4, }}>
                <Image
                    style={{
                        height: '80%', width: '100%',
                        resizeMode: 'contain',
                    }}
                    source={{ uri: 'https://ambula.app/assets/logo-fde743f5.png' }}
                />
            </View>

            <View style={{ height: 50, width: '30%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Image

                    style={{ height: 40, width: 40, borderRadius: 20 }}
                    source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/046/869/original/hand-holding-gold-coins-png.png' }}
                />

                <Image
                    style={{ height: 40, width: 40, tintColor: 'blue' }}
                    source={{ uri: 'https://cdn-icons-png.freepik.com/512/8455/8455409.png' }}
                />

            </View>
        </View>
    </>)
}


export const Card = (CardData) => {
    console.log("data 1 is ", CardData);
    return (
        <>
            <View style={styles.Card}>
                <FlatList
                    numColumns={3}
                    data={CardData.CardData}
                    renderItem={InnercardView}
                />
            </View>
        </>
    )
}
export const InnercardView = ({ item }) => {
    console.log("ggggg", item.name);
    return (<>
        <TouchableOpacity style={styles.innertouch}>
            <View style={{
                height: 45,
                width: 45,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderColor: 'grey',
                borderWidth: 0.5
            }}>
                <Image style={{ height: 30, width: 30, }}

                    source={{ uri: item?.image }}
                >

                </Image>

            </View>

            <View style={{
            
                maxHeight: 45,
                height:'auto',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ color: 'black', fontSize: 13, textAlign: 'center' }}>
                    {item.name}
                </Text>

            </View>

        </TouchableOpacity>
    </>)

}
export const Footer = () => {
    const [page, setPage] = useState(1)
    return (<>
        <View style={styles.Footer}>
            <TouchableOpacity
                onPress={() => { setPage(1) }}
                style={{
                    height: 60, width: 80, borderTopColor: 'blue',
                    borderTopWidth: page == 1 ? 3 : 0,
                }}>
                <Image
                    style={{ height: 50, }}
                    source={{ uri: 'https://i.pinimg.com/originals/7a/50/68/7a5068405ea0756e3c303f4866beb37f.png' }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { setPage(2) }}
                style={{
                    height: 60, width: 80, borderTopColor: 'blue',
                    borderTopWidth: page == 2 ? 3 : 0, justifyContent: 'center', alignItems: 'center'
                }}>
                <Image
                    style={{ height: 50, width: 50, }}
                    source={{ uri: page == 1 ? 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png' : 'https://static.vecteezy.com/system/resources/previews/012/791/185/original/hand-up-human-icon-free-vector.jpg' }}
                />
            </TouchableOpacity>

        </View>
    </>)
}
export const Card2 = () => {
    const [visible, setVisible] = useState(false)
    const [playing, setPlaying] = useState(false);
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const ModalFlatlist = ({ item }) => {
        return (<>
            <View style={{ height: 100, 
                width: '100%', 
                marginVertical: 10,
                 justifyContent: 'space-between',
                  flexDirection: 'row',
                   alignItems: 'center' }}>
                <View style={{ height: 100, width: '25%', 
                    justifyContent: 'center', 
                    alignItems: 'center' }}>
                    <View style={{ height: 70,
                         width: 70, backgroundColor: 'grey', 
                         alignItems: 'center', 
                         justifyContent: 'center', 
                         borderRadius: 40 }}>
                        <Image
                            style={{ height: 40, width: 40, borderRadius: 50 }}
                            source={{ uri: item.image }}
                        />
                    </View>

                </View>
                <View style={{ height: 100, width: '70%', }}>
                    <View style={{ height: 30, width: '100%', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 17, fontWeight: '700' }}>{item.name}</Text>

                    </View>

                    <View style={{ height: 70, width: '100%', }}>
                        <Text style={{ fontSize: 15, fontWeight: '600' }}>{item.Text}</Text>

                    </View>

                </View>
            </View>
        </>)
    }

    const CompwithKnowmore = ({ item }) => {

        return (<>

            <View style={[styles.Knowmore, { flexDirection: item.ButtonDirection == "left" ? 'row' : 'row-reverse' }]}>
                <View style={{ height: '90%', width: '70%', }}>
                    <View style={{ height:'auto',maxHeight:'20%', width: '100%', paddingHorizontal: 20,marginVertical:5 }}>
                        <Text style={{ color: 'black', fontSize: 17, fontWeight: '600' }}>
                            {item.name}
                        </Text>
                    </View>

                    <View style={{ height: '50%', width: '90%', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 15, color: 'black', }}>{item.Text}</Text>
                    </View>

                    <View style={{ height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible(true)
                            }}
                            style={{ height: '80%', width: '60%', backgroundColor: 'blue', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>{item.buttonTxt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: '90%', width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ height: '80%', width: '100%' }}
                        source={{ uri: item.image }}
                    >

                    </Image>

                </View>
            </View>



        </>)
    }
    return (<>
        <FlatList
            data={CompData}
            renderItem={CompwithKnowmore}
            ListHeaderComponent={() => { return (<><View style={{ height: 10, width: WIDTH, }}></View></>) }}
            ListFooterComponent={() => { return (<><View style={{ height: 20, width: WIDTH, }}></View></>) }}
        />


        <Modal
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible)
            }}>
            <View style={styles.Modal}>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ height: 210, width: '90%', borderRadius: 20, alignSelf: 'center', margin: 20, overflow: 'hidden', backgroundColor: 'black' }}>
                        <YoutubePlayer
                            height={240}

                            play={playing}
                            videoId={"JW_T381N78s"}
                            onChangeState={onStateChange}
                        />


                    </View>

                    <FlatList
                        data={CompData}
                        renderItem={ModalFlatlist}
                        keyExtractor={(item, index) => index}
                        ListHeaderComponent={() => { return (<><View style={{ height: 10, width: WIDTH, }}></View></>) }}
                        ListFooterComponent={() => { return (<><View style={{ height: 50, width: WIDTH, }}></View></>) }}


                    />


                </ScrollView>
            </View>

        </Modal>

    </>)
}

export const HeaderText = ({ txt }) => {
    return (<>
        <Text style={{ fontSize: 19, fontWeight: '700', color: 'black', marginHorizontal: 20, }}>{txt}</Text>
    </>)
}


const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },

    Modal: {
        height: 800,
        width: '100%',
        backgroundColor: '#dbd7d2',
        borderRadius: 20,
        marginTop: 100
    },
    Knowmore: {
        height: 230,
        width: WIDTH * 0.93,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    Footer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: 'grey',
        borderTopWidth: 1,
        paddingTop: -5

    },
    Card: {
        flex: 1, backgroundColor: 'white',
        borderColor: "skyblue",
        borderWidth: 1,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 5
    },
    innertouch: {
        height: 100,
        width: WIDTH * 0.23,
        marginVertical: 5,
        marginHorizontal: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    }
});
