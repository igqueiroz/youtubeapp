import React, {Component}  from 'react'
import ReactDOM from 'react-dom'

const ConvertNumbers = {
	NumberFormat(num){
	    var n = num.toString(), p = n.indexOf('.');
	    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
	        return p<0 || i<p ? ($0+'.') : $0;
	    });
	},
	NumberDurationToSeconds (duration) {
        var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
        var hours = ((parseInt(match[1]) || 0) !== 0)?parseInt(match[1])+":":"";
        var minutes = ((parseInt(match[2]) || 0) !== 0)?parseInt(match[2])+":":"0";
        var seconds = ((parseInt(match[3]) || 0) !== 0)?parseInt(match[3]):"00";
        var total = hours + minutes + seconds;
        return total;
    },
    NumberConvertDate(dates) {
        var date =  dates.split('T');
        date = date[0].split('-');
        switch(date[1]) {
        	case "01" : date[1] =  "Janeiro";
        		break;
        	case "02" : date[1] =  "Fevereiro";
        		break;
        	case "03" : date[1] =  "Março";
        		break;
        	case "04" : date[1] =  "Abril";
        		break;
        	case "05" : date[1] =  "Maio";
        		break;
        	case "06" : date[1] =  "Junho";
        		break;
        	case "07" : date[1] =  "Julho";
        		break;
        	case "08" : date[1] =  "Agosto";
        		break;
        	case "09" : date[1] =  "Setembro";
        		break;
        	case "10" : date[1] =  "Outubro";
        		break;
        	case "11" : date[1] =  "Novembro";
        		break;
        	case "12" : date[1] =  "Dezembro";
        		break;
        }
        return date[2] + ' de ' + date[1] + ' de ' + date[0];
    }
}

export default ConvertNumbers