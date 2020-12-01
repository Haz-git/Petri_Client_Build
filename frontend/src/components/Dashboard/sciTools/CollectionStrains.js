import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CollectionStrainCard from './CollectionStrainCard';

//Styles:
import { StyledMainHeader } from './Collection';

const StrainMainContainer = styled.div`
    margin-top: 30px;
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
`

//Render:

const CollectionStrains = ({ ownProtocolStrains, protocolId }) => {

    const renderStrains = () => {
        if (ownProtocolStrains) {
            return (
                ownProtocolStrains.map(strain => (
                    <>
                        <CollectionStrainCard 
                            name={strain.strainName}
                            pointNum={strain.collectionPoints}
                            startTime={strain.startTime}
                            strainId={strain.strainId}
                            protocolId={protocolId}
                            key={strain.strainId}
                        /> 
                    </>
                ))
            )
        } else {
            return (
                <div>
                    Uh Oh. Nothing's here! Have you entered your strains?
                </div>
            )
        }
    }


    return (
        <>
            <StrainMainContainer>
                <StyledMainHeader>
                    Your Strains
                </StyledMainHeader>
                {renderStrains()}
            </StrainMainContainer>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { ownProtocolId } = ownProps;
    const ownProtocol = state.laczAssayProtocols.laczProtocol.find(item => item.protocolId === ownProtocolId)

    return {
        ownProtocolStrains: ownProtocol.collectionStrains,
        protocolId: ownProtocolId,
    }
}

export default connect(mapStateToProps)(CollectionStrains);
