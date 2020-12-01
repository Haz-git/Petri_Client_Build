import React from 'react';
import { linearRegression, linearRegressionLine, rSquared } from 'simple-statistics';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import Badge from 'react-bootstrap/Badge';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';


//Styles:
import {StyledBadge} from './CollectionCharts';

const MainChartContainer = styled.div`
    display: grid;
    grid-template-columns: 77% 23%;
`
const FlexContainer = styled.div`
    position: relative;
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


//Render:
const LacZChart = ({
    ownStrain,
    minute,
    dilutionFactor,
    volume,
}) => {

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

            const bgalUnit = ((1000 * (OD420 - 1.75 * OD550) * dilutionFactor)/(minute * volume));

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

    console.log(bgalConfiguredData);


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
                    </BadgeContainer>
                </FlexContainer>
            </MainChartContainer>
        </>
    )
}

export default LacZChart;
