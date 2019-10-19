import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableOpacity, Modal, SafeAreaView, FlatList } from "react-native";

export default class CustomPicker extends React.Component {
    state = {
        visible: false,
    };

    /**
     * Key extractor for `FlatList`.
     */
    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <React.Fragment>
                <TouchableOpacity activeOpacity={this.props.activeOpacity} onPress={() => this.hideShowModal(!this.state.visible)} style={[styles.container, this.props.containerStyle]}>
                    <View style={styles.placeholderView}>
                        <Text style={styles.selectedItem} numberOfLines={1}>
                            {this.props.value ? this.props.value : this.props.placeholder}
                        </Text>
                    </View>
                    <View style={styles.iconView} >
                        <Icons {...this.props.iconProps} />
                    </View>
                </TouchableOpacity>
                <Modal visible={this.state.visible} animationType="none" transparent={true}>
                    <View style={styles.blurView} />
                    <SafeAreaView style={styles.modalContainer}>
                        <TouchableOpacity style={styles.list} onPress={this.closeModal} activeOpacity={1}>
                            <View style={styles.itemsContainer}>
                                <TouchableOpacity style={styles.listHeader} activeOpacity={1}>
                                    <Text style={styles.headerText}>{this.props.placeholder}</Text>
                                    <TouchableOpacity onPress={this.closeModal} style={{ width: 20, height: 20 }} >
                                        <Icons type={Icons.IconNames.Close} color={colors.white} height={13} width={13} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <FlatList
                                    data={this.props.items}
                                    renderItem={this.renderItem}
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={this._keyExtractor}
                                    extraData={this.props.value}
                                />
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
            </React.Fragment>
        );
    }

    hideShowModal = (visible) => {
        this.setState({ visible });
    }

    closeModal = () => this.hideShowModal(false);

    renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.itemView} onPress={() => this.handleItemPress(item.value, index)}>
            <Text style={styles.itemLabel} numberOfLines={1}>{item.label}</Text>
            <View style={styles.radioView}>
                {this.props.value === item.value && <View style={styles.innerRadioView} />}
            </View>
        </TouchableOpacity>
    );

    handleItemPress = (value, index) => {
        this.props.onValueChange(value, index);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
    },
    iconView: {
        width: 20,
        alignItems: "center",
    },
    placeholderView: {
        flex: 1,
    },
    selectedItem: {
        color: "#000",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 10,
    },
    blurView: {
        backgroundColor: "#000",
        flex: 1,
        opacity: .5,
        position: 'absolute',
        width: "100%",
    },
    list: {
        padding: 30,
        justifyContent: 'center',
        alignItems: "center",
        height: "100%",
    },
    itemsContainer: {
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: 350,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginBottom: 15,
    },
    listHeader: {
        padding: 15,
        backgroundColor: "purple",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        flex: 1,
        fontSize: 15,
    },
    itemView: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        borderBottomWidth: 0.5,
        borderColor: "#ccc"
    },
    radioView: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 30,
        width: 25,
        height: 25,
        padding: 5
    },
    innerRadioView: {
        backgroundColor: "purple",
        borderRadius: 30,
        width: "100%",
        height: "100%",
    },
    itemLabel: {
        color: "#000",
        flex: 1,
        paddingRight: 5,
    }
});

CustomPicker.defaultProps = {
    iconProps: {
        /*         type: Icons.IconNames.DownArrow, */
        width: 15,
        height: 15,
        color: "#000",
    },
    activeOpacity: 0.2,
};

CustomPicker.propTypes = {
    placeholder: PropTypes.string,
    onValueChange: PropTypes.func,
    value: PropTypes.string,
    items: PropTypes.array,
    iconProps: PropTypes.object,
    containerStyle: PropTypes.object,
    activeOpacity: PropTypes.number,
};