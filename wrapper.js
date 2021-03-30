import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './header';
import Searchbar from './searchbar';
import SearchView from './searchView';

const Wrapper = ({
    animationDuration,
    headerRight,
    headerLeft,
    title,
    titleStyle,
    cancelText,
    cancelTextStyle,
    cancelTextMarginRight,
    placeholder,
    searchbarStyle,
    headerStyle,
    placeholderTextColor,
    onPressCancel,
    onFocus,
    onChangeText,
    headerHeight, // Header height without searchbar
    searchBarIcon,
    searchScreen,
    fullHeaderStyle,
    children
}) => {
    const header = useRef();
    const searchbar = useRef();
    const searchView = useRef();
    const [hiddenHeader, setHiddenHeader] = useState(false); 
    const [dimensions, setDimensions] = useState({
        fullHeaderHeight: undefined,
        searchbarHeight: undefined
    });

    const open = useCallback(() => {
        onPressCancel && onPressCancel();
        setHiddenHeader(true);
        header.current.close();
        searchbar.current.open();
        searchView.current.open();
    }, []);

    const close = useCallback(() => {
        onFocus && onFocus();
        setHiddenHeader(false);
        header.current.open();
        searchbar.current.close();
        searchView.current.close();
    }, [])

    const onLayoutFullHeader = useCallback(event => {
        const { fullHeaderHeight } = dimensions;
        const { height } = event.nativeEvent.layout;
        if (fullHeaderHeight && fullHeaderHeight >= height) return // layout was already called

        setDimensions({ ...dimensions, fullHeaderHeight: height });
    }, [dimensions, setDimensions])

    const onLayoutSearchBar = useCallback(event => {
        const { searchbarHeight } = dimensions;
        const { height } = event.nativeEvent.layout;
        if (searchbarHeight && searchbarHeight >= height) return // layout was already called
        setDimensions({ ...dimensions, searchbarHeight: height });
    }, [dimensions, setDimensions])
    console.log("hiddenHeader ?", hiddenHeader)
    return (
        <View style={styles.container}>
            <View onLayout={onLayoutFullHeader} style={fullHeaderStyle}>
                <Header
                    ref={header}
                    title={title}
                    titleStyle={titleStyle}
                    duration={animationDuration}
                    headerStyle={headerStyle}
                    right={headerRight}
                    left={headerLeft}
                    height={headerHeight}
                    hiddenHeader={hiddenHeader}

                />
                <Searchbar
                    ref={searchbar}
                    onFocus={open}
                    onCancel={close}
                    duration={animationDuration}
                    placeholder={placeholder}
                    cancelText={cancelText}
                    cancelTextStyle={cancelTextStyle}
                    searchbarStyle={searchbarStyle}
                    placeholderTextColor={placeholderTextColor}
                    marginRight={cancelTextMarginRight}
                    onLayout={onLayoutSearchBar}
                    onChangeText={onChangeText}
                    searchBarIcon={searchBarIcon}
                />
            </View>
            {
                dimensions.fullHeaderHeight && dimensions.searchbarHeight &&
                <SearchView 
                    ref={searchView}
                    duration={animationDuration} 
                    searchbarHeight={dimensions.searchbarHeight} 
                    fullHeaderHeight={dimensions.fullHeaderHeight}
                >
                    {searchScreen}
                </SearchView>
            }
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

Wrapper.defaultProps = {
    backgroundColor: '#191919',
    animationDuration: 150,
    title: 'Title',
    placeholder: 'Search...',
    cancelText: 'Cancel',
    cancelTextMarginRight: 20,
    headerHeight: 50
}

export default Wrapper;