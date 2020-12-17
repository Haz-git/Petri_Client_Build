import React, { useState } from 'react';
import { linearRegression, linearRegressionLine, rSquared } from 'simple-statistics';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import { bgalDataToStrain } from '../../../redux/userLacZ/LacZActions'; 
import { connect } from 'react-redux';



//Styles:
import { StyledBadge } from './CollectionCharts';
import { Save } from '@styled-icons/entypo/Save';

const MainChartContainer = styled.div`
    display: grid;
    grid-template-columns: 77% 23%;
`
const FlexContainer = styled.div`
    position: relative;
    background-color: ${props => props.theme.lacZChartFlexContainerBG};
`

const BadgeContainer = styled.div`
    position: absolute;
    top: 70%;
    transform: translateY(-70%);
`

const LacZBadge = styled(StyledBadge)`
    background-color: #242746;
    color: white;
    filter: drop-shadow(0 0 1px black);
`
const SaveIcon = styled(Save)`
    height: 23px;
    width: 23px;
    margin-right: 7px;
    vertical-align: sub;
`
const SaveButtonContainer = styled.div`
    margin-top: 20px;
`

const StyledAlert = styled(Alert)`
    transition: all 1s ease-in-out;
`


//Render:
const LacZChart = ({
    ownStrain,
    ownProtocolId,
    bgalDataToStrain,
}) => {

    const [ showAlert, setShowAlert ] = useState(false);

    let bgalParsedData;
    let bgalConfiguredData = [];

    if (ownStrain.lacZData !== null && ownStrain.lacZData !== undefined) {
        bgalParsedData = {...ownStrain};
    }

    if (bgalParsedData !== null && bgalParsedData !== undefined) {
        for (let j = 0; j < bgalParsedData.collectionData.length; j++) {
            bgalConfiguredData.push({
                collectionNum: bgalParsedData.collectionData[j].collectionNum,
                od600value: bgalParsedData.collectionData[j].odValue,
            })
        }

        for (let k = 0; k < bgalParsedData.lacZData.length; k++) {
            const OD420 = bgalParsedData.lacZData[k].odValue420;
            const OD550 = bgalParsedData.lacZData[k].odValue550;
            const dilutionFactor = bgalParsedData.lacZData[k].dilutionFactor;
            const minutesTaken = bgalParsedData.lacZMinutesTaken;
            const volumeUsed = bgalParsedData.lacZVolumeUsed;

            const bgalUnit = ((1000 * (OD420 - 1.75 * OD550) * dilutionFactor)/(minutesTaken * volumeUsed));

            bgalConfiguredData[k]['bgalUnit'] = bgalUnit;
        }
    }

    let linearRegressionArray = [];

    for (let x = 0; x < bgalConfiguredData.length; x++) {

        if (bgalConfiguredData[x] !== undefined) {
            let pairArray = [];
            pairArray.push(Number(bgalConfiguredData[x].od600value));
            pairArray.push(bgalConfiguredData[x].bgalUnit);

            linearRegressionArray.push(pairArray);
        }

    }

    bgalConfiguredData['lacZLinearRegressionArray'] = linearRegressionArray;

    const { m } = linearRegression(linearRegressionArray);
    const regressionLine = linearRegressionLine(linearRegression(linearRegressionArray));
    const rSquaredValue = rSquared(linearRegressionArray, regressionLine);

    bgalConfiguredData['linearRegressionValueLacZ'] = m;
    bgalConfiguredData['rSquaredValueLacZ'] = rSquaredValue.toFixed(3);



    const renderSaveButton = () => {
        if (bgalConfiguredData.linearRegressionValueLacZ !== null || bgalConfiguredData.linearRegressionValueLacZ !== undefined) {
            return (
                <Button variant={showAlert ? 'success' : 'warning'} onClick={handleButtonSave} size='lg'>
                    <SaveIcon />
                    Save
                </Button>
            )
        } else {
            return null;
        }
    }

    const handleButtonSave = () => {
        setShowAlert(true);
        console.log(bgalConfiguredData);
        bgalDataToStrain(ownStrain.strainId, ownProtocolId, {
            bgalConfiguredData,
            bgalSlope: bgalConfiguredData.linearRegressionValueLacZ,
            bgalRSquared: bgalConfiguredData.rSquaredValueLacZ,
        });
    }


    return (
        <>
            <MainChartContainer>
                <ResponsiveContainer aspect={2.1}>
                    <LineChart width={400} height={350} data={bgalConfiguredData} margin={{ top: 0, right: 20, left: 30, bottom: 40 }}>
                        <Line type="monotone" dataKey="bgalUnit" stroke="#2d2d7d" strokeWidth={2.5} />
                        <CartesianGrid stroke="#9f9d9d" strokeDasharray="5 5" />
                        <XAxis dataKey="od600value">
                            <Label value='OD-600 Value' position='bottom' style={{ textAnchor: 'middle' }} />
                        </XAxis>
                        <YAxis dataKey='bgalUnit'>
                            <Label value='B-Galactosidase Units' position='left' angle={-90} style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip />
                        <Legend verticalAlign="top" height={40}/>
                    </LineChart>
                </ResponsiveContainer>
                <FlexContainer>
                    <BadgeContainer>
                        <LacZBadge variant='light'>
                            Linear Regression: {bgalConfiguredData.linearRegressionValueLacZ.toFixed(3)}
                        </LacZBadge>
                        <LacZBadge variant='light'>
                            rSquaredValue: {bgalConfiguredData.rSquaredValueLacZ}
                        </LacZBadge>
                        <SaveButtonContainer>
                            {renderSaveButton()}
                        </SaveButtonContainer>
                    </BadgeContainer>
                </FlexContainer>
            </MainChartContainer>
        </>
    )
}

export default connect(null, { bgalDataToStrain })(LacZChart);
