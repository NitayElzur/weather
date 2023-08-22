import './Results.css'
import { useContext } from 'react';
import { ResultContext } from '../../Contexts/ResultContext';
import Loader from '../Loader/Loader';

function Results() {
    const { result, isLoading } = useContext(ResultContext)
    return (
        <div id="results-back" className={isLoading ? 'loading' : ''}>
            {isLoading &&
                <Loader />
            }
            {typeof (result) === 'object'
                ?
                <div id="main-results">
                    <div id="head">
                        <h2>{result.name}</h2>
                        <h3>{result.country}</h3>
                    </div>
                    <div id="temp">
                        <h1>{result.temp + '°'}</h1>
                    </div>
                    <div id="metrics">
                        <div className="metric-item">
                            <h3>Precipitation</h3>
                            <h3>{result.precipitation + ' mm'}</h3>
                        </div>
                        <div className="metric-item">
                            <h3>Humidity</h3>
                            <h3>{result.humidity + '%'}</h3>
                        </div>
                        <div className="metric-item">
                            <h3>Wind</h3>
                            <h3>{result.wind + ' km/h'}</h3>
                        </div>
                    </div>
                </div>
                :
                <div id='result-error'>{result}</div>
            }
        </div>

    )
}
export default Results;