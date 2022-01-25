import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, SafeAreaView, ActivityIndicator } from 'react-native'
import NewsCard from '../components/NewsCard'
import Newsapis from '../apis/Newsapis'

const News = () => {

    const [news, setNews] = useState([])
    const [masterData, setMasterData] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPost()
    }, [currentPage])


    const fetchPost = () => {
        setIsLoading(true)
        const apiURl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=08a4512887c74e309440e9a0b9bea5eb&page=${currentPage}`;
        fetch(apiURl)
        .then((response) => response.json())
        .then((responseJson)=>{
            setNews([...news, ...responseJson.articles]);   
            setMasterData(responseJson.articles);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }
    //with axios method to call
    // function getNewsFromApi(){
    //     Newsapis.get('top-headlines?country=us&apiKey=08a4512887c74e309440e9a0b9bea5eb')
    //     .then(function(response){
    //         setNews(response.data);
    //     })
    //     .catch(function(error){
    //         console.log(error)
    //     })
    // }
    if(!news){
        return null;
    }
    const searchFilter =(text)=>{
        if(text){
            const newData = masterData.filter((item)=>{
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setNews(newData);
            setSearch(text);
        }
        else{
            setNews(masterData);
            setSearch(text);
        }
    }
    const renderLoader=()=>{
        return (
            isLoading ?
            <View style = {styles.loaderStyle}>
                <ActivityIndicator size= 'large' color = '#aaa'/>
            </View> : null
        )
    }
    const loadMoreItems=()=>{
        return(
            setCurrentPage(currentPage + 1)
        )
    }
    return (
        <SafeAreaView>
            <TextInput 
                value = {search}
                placeholder='Search News'
                onChangeText={(text) => searchFilter(text)}
            />
        <FlatList 
            data = {news}
            keyExtractor={(item, index) => 'key' + index}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItems} 
            onEndReachedThreshold={0}
            renderItem={({item}) => {
                return <NewsCard item = {item} />
            }}
            
        />
        </SafeAreaView>
    )
}

export default News

const styles = StyleSheet.create({
    loaderStyle: {
        bottom: 30,
        alignItems: 'center'
    }
})
