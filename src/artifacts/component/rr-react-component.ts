import {Component} from 'react';
import {RapidState} from "../interface/rr-mixed-interface";


export default class RapidReactComponent<P, S extends RapidState> extends Component<P, S> {}