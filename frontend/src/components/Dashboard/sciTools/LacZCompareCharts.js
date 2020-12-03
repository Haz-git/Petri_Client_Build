import React from 'react';
import { connect } from 'react-redux';

const LacZCompareCharts = ({ laczAssayProtocols, match:{params:{id}} }) => {

    const ownProtocol = laczAssayProtocols.find(x => x.protocolId === id);

    console.log(ownProtocol);


    return (
        <>
            This page is currently under construction...
        </>
    )
}

const mapStateToProps = state => {
    return {
        laczAssayProtocols: state.laczAssayProtocols.laczProtocol,
    }
}

export default connect(mapStateToProps)(LacZCompareCharts);
