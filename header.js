import React, { Component } from 'react';
import { Animated, SafeAreaView, View, StyleSheet, Text } from 'react-native';

class Header extends Component {
    hidden = false;
    isOpened = true;
    transition = 'fade';
    state = {
        animatedHeight: new Animated.Value(this.props.height),

    }

    open() {
        const { animatedHeight } = this.state;
        const { height, duration } = this.props;
        const { isOpened } = this;
        if (isOpened) return;
        this.isOpened = true;
        Animated.timing(
            animatedHeight,
            {
                toValue: height,
                duration: duration,
                useNativeDriver: false
            },
        ).start()
    }

    close() {
        const { animatedHeight } = this.state;
        const { duration } = this.props;
        const { isOpened } = this;

        if (!isOpened) return;
        this.isOpened = false;

        Animated.timing(
            animatedHeight,
            {
                toValue: 0,
                duration: duration,
                useNativeDriver: false
            },
        ).start()
    }

    render() {
        const { animatedHeight } = this.state;
        const { title, left, right, titleStyle, headerStyle } = this.props;
        return (
            <View style={headerStyle}>
                <SafeAreaView>
                    <StatusBar
                        animated={true}
                        showHideTransition={transition}
                        hidden={!isOpened}
                    />
                    <Animated.View style={[{ height: animatedHeight }, styles.contianer]}>
                        <View style={styles.side}>
                            {left}
                        </View>
                        <Text style={titleStyle}>{title}</Text>
                        <View style={styles.side}>
                            {right}
                        </View>
                    </Animated.View>
                </SafeAreaView>
            </View>

        );
    }
}

Header.defaultProps = {
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#f1f1f1"
    }
}

const styles = StyleSheet.create({
    contianer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    side:{
        flex:1
    }
});

export default Header;