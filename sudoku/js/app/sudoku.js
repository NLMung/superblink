define(['ivy'], function(Ivy) {
   IVYSUDOKU = (function () {
   var lang = "en";
   var activeSquare;
   var problemGrid;
   var solutionGrid;
   var userGrid;
   var finished;
   var level = 0;
   var grad = ["EASY","MIDDLE","HARD"];
   var keyString = "";
   var loadedData;
   var wl;
   var instruxAnimateTimer;
   var isTouchDevice = 'ontouchstart' in document.documentElement;
   var initOnceDone = false;
   function initLanguage() {
    	wl = {};
    	wl["EASY_en"] = "EASY";
    	wl["MIDDLE_en"] = "MIDDLE";
    	wl["HARD_en"] = "HARD";
    	wl["TAP_AN_EMPTY_SQUARE_en"] = "Tap an empty square!";
    	wl["TAP_A_SQUARE_en"] = "Tap a square to enter a number!";
    	wl["TAP_A_SQUARE_ERROR_en"] = "Tap a square with an error to change it!";
    	wl["TAP_A_NUMBER_en"] = "Tap a number to write it in the square!";
    	wl["THEN_TAP_A_NUMBER_en"] = "Then tap a number to write it in the square.";
    	wl["SELECT_A_NUMBER_en"] = "Select another number to change,<br>or select another empty square to continue!";
    	wl["ADD_MORE_NOTES_en"] = "Add more notes or select your number for this square.";
    	wl["SELECT_A_NEW_SQUARE_en"] = "Select a new square or select another number.";
    	wl["NO_WRONG_NUMBERS_en"] = "There are no wrong numbers!";
    	wl["THERE_ARE_en"] = "There are ";
    	wl["ERRORS_IN_THE_PUZZLE_en"] = " errors in the puzzle.";
    	wl["YOU_HAVE_en"] = "You have ";
    	wl["SQUARES_LEFT_en"] = " squares left.";
    	wl["CONGRATS_en"] = "Congratulations!<br>You have solved ";
    	wl["CONGRATS1_en"] = "Congratulations!";
    	wl["CONGRATS2_en"] = "You have solved ";
    	wl["THE_SMALL_NUMBERS_ARE_en"] = "The small numbers are notes.<br>You can use multiple notes within each square.";
    	wl["RESTART_en"] = "Restart ";
    	wl["ALL_PROGRESS_WILL_BE_LOST_en"] = "All progress will be lost.";
        wl["OK_en"] = "OK";
        wl["CANCEL_en"] = "Cancel";
        wl["RESTART_OR_ANOTHER_en"] = "Restart to play the same again, or select another level of difficulty.";

    	wl["EASY_no"] = "LETT";
    	wl["MIDDLE_no"] = "MIDDELS";
    	wl["HARD_no"] = "VANSKELIG";
    	wl["TAP_AN_EMPTY_SQUARE_no"] = "Trykk på en tom rute!";
    	wl["TAP_A_SQUARE_no"] = "Trykk på en rute for å skrive inn et tall!";
    	wl["TAP_A_SQUARE_ERROR_no"] = "Trykk på en rute som inneholder en feil for å endre den!";
    	wl["TAP_A_NUMBER_no"] = "Trykk på et tall for å skrive det i ruten!";
    	wl["THEN_TAP_A_NUMBER_no"] = "Deretter tryker du på et tall for å skrive det i ruten.";
    	wl["SELECT_A_NUMBER_no"] = "Trykk et annet nummer for å endre,<br>eller velg en annen tom rute for å fortsette";
    	wl["ADD_MORE_NOTES_no"] = "Legg til flere notater, eller velg et nummer for denne ruten.";
    	wl["SELECT_A_NEW_SQUARE_no"] = "Velg en ny rute, eller velg et annet tall.";
    	wl["NO_WRONG_NUMBERS_no"] = "Det er ingen gale tall!";
    	wl["THERE_ARE_no"] = "Det er ";
    	wl["ERRORS_IN_THE_PUZZLE_no"] = " feil i oppgaven.";
    	wl["YOU_HAVE_no"] = "Du har ";
    	wl["SQUARES_LEFT_no"] = " ruter igjen.";
    	wl["CONGRATS_no"] = "Gratulerer!<br>Du har løst ";
    	wl["CONGRATS1_no"] = "Gratulerer!";
    	wl["CONGRATS2_no"] = "Du har løst ";
    	wl["THE_SMALL_NUMBERS_ARE_no"] = "De små tallene er notater.<br>Du kan ha flere notater på hver rute.";
    	wl["RESTART_no"] = "Omstart ";
    	wl["ALL_PROGRESS_WILL_BE_LOST_no"] = "Alt du har lagt inn vil bli borte.";
        wl["OK_no"] = "OK";
        wl["CANCEL_no"] = "Avbryt";
        wl["RESTART_OR_ANOTHER_no"] = "Velg omstart for å spille den samme igjen, eller velg en annen vanskelighetsgrad.";

    	grad = [language("EASY"),language("MIDDLE"),language("HARD")];
    }
    function language(key) {
    	return wl[key+"_"+lang];
    }
    function initOnce() {
    
	    var boardSquares = document.querySelectorAll('#board .group > .square');
        for(var i = 0; i < boardSquares.length; i++) {
	        if (isTouchDevice) {
		       	boardSquares[i].addEventListener('touchstart', function (e) {
	            	squareClick(e.currentTarget.id);
	            	console.log('tapped .square');
            	}, true);
	        } else {
		        boardSquares[i].onmousedown = function(e){
                	squareClick(e.currentTarget.id);
            	};
	        }
            
        }

        var keyboardSquareNumbers = document.querySelectorAll('#keyboard .square_numbers .square');
        for(var i = 0; i < keyboardSquareNumbers.length; i++) {
            if (isTouchDevice) {
	            
	            keyboardSquareNumbers[i].addEventListener('touchstart', function(e){
					keyboardClick(parseInt(e.currentTarget.id.charAt(e.currentTarget.id.length-1),10))
	            	console.log('tapped .square_numbers .square');
				}, true);
			} else {
				keyboardSquareNumbers[i].onclick = function(e){
                	keyboardClick(parseInt(e.currentTarget.id.charAt(e.currentTarget.id.length-1),10));
            	};
			}
        }

        var keyboardNotes = document.querySelectorAll('#keyboard .note_numbers .square');
        for(var i = 0; i < keyboardNotes.length; i++) {
            if (isTouchDevice) {
				
				keyboardNotes[i].addEventListener('touchstart', function(e){
					keyboardNoteClick(parseInt(e.currentTarget.id.charAt(e.currentTarget.id.length-1),10))
					console.log('tapped .note_numbers .square');

				}, true);
			} else {
				keyboardNotes[i].onclick = function(e){
					keyboardNoteClick(parseInt(e.currentTarget.id.charAt(e.currentTarget.id.length-1),10));
				};
			}
        }

        document.body.onclick = function(e) {
            if (e.target===document.body) {
                squareClick();
            }
        };
        
        if (isTouchDevice) {
	     
	        document.querySelector('.status').addEventListener('touchstart', function(e) {
	            status()
	        }, true);
	      
	        document.querySelector('.restart').addEventListener('touchstart', function(e) {
	            restart()
	        }, true);
	    } else {
	        document.querySelector('.status').onclick = function(e) {
	            status();
	        };
	
	        document.querySelector('.restart').onclick = function(e) {
	            restart();
	        };
        }
        
        document.querySelector('#dagens').onchange = function(e) {
	        levelSelect(e.currentTarget.value);
	    };
	    
	    initOnceDone = true;
    }
    
    function init(_level) {
	    lang = sudokulang;
	    initLanguage();
	    document.onkeydown = checkKeyDown;
	    console.log("perfectsudoku ivysudoku.init ... "+_level);


        if (!initOnceDone) {
	        initOnce();
        }

	    instruction(language("TAP_A_SQUARE"));
	    level = _level;
	    keyString = sudokudate;
	    Ivy.init(keyString, sudokuInApp);
        Ivy.Get("lastLevel", "IVYSUDOKU.lastlevelOK", "OK", "IVYSUDOKU.lastlevelFAILED", "FAILED"); 
       /* Flytt denne til function usergridOK:
         if (errors()===0 && squaresLeft()===0) {
           victory(true);
        }
        */
	}
   function checkKeyDown(e) {
        e = e || window.event;
        if (e.target.toString().indexOf("TextArea")!==-1) return; // Tillate space og backspace i kommentarfelt
        if (e.target.toString().cont)
        if ((e.keyCode>=49 && e.keyCode<=57) || (e.keyCode>=97 && e.keyCode<=105)) {
       		if (e.keyCode>=97) {
           		keyboardClick(e.keyCode-96);
       		} else {
           		keyboardClick(e.keyCode-48);
       		}
           e.preventDefault();
       } else if (e.keyCode==8 || e.keyCode==32 || e.keyCode==46 || e.keyCode==48 || e.keyCode==96) {
       		clearSquare();
           e.preventDefault();
       } else if (e.keyCode==37 || e.keyCode==38 || e.keyCode==39 || e.keyCode==40) {
       		if (activeSquare) {
		   		var asid = activeSquare.id.split("_");
		   		var x = parseInt(asid[1]);
		   		var y = parseInt(asid[2]);
		   		console.log(x+" "+y);
		   		activeSquare.className = 'square editable';
		   		activeSquare = null;
		   		while(!activeSquare) {
		   		if (e.keyCode==37) {
		   		 x -=1;
		   		 } else if (e.keyCode==39) {
			   		 x +=1;
		   		 } else if (e.keyCode==38) {
			   		 y -=1;
		   		 } else if (e.keyCode==40) {
			   		 y +=1;
		   		 }
		   		 if (x<1) {
			   		 x=9;
		   		 } else if (x>9) {
			   		 x = 1;
		   		 }
		   		 if (y<1) {
			   		 y=9;
		   		 } else if (y>9) {
			   		 y = 1;
		   		 }
			   		if (document.getElementById("s_"+x+"_"+y).className === "square editable") {
				   		squareClick("s_"+x+"_"+y);
			   		}
		   		}
       		}
       		e.preventDefault();
       }
    }
    function initProblem() {
        loadedData = sudokudata;
        userGridString = "";
	    userGrid = [];
        userGrid[0] = [0,0,0,0,0,0,0,0,0];
        userGrid[1] = [0,0,0,0,0,0,0,0,0];
        userGrid[2] = [0,0,0,0,0,0,0,0,0];
        userGrid[3] = [0,0,0,0,0,0,0,0,0];
        userGrid[4] = [0,0,0,0,0,0,0,0,0];
        userGrid[5] = [0,0,0,0,0,0,0,0,0];
        userGrid[6] = [0,0,0,0,0,0,0,0,0];
        userGrid[7] = [0,0,0,0,0,0,0,0,0];
        userGrid[8] = [0,0,0,0,0,0,0,0,0];
		problemGrid = [];
		solutionGrid = [];
		for (var i = 0; i<9; i++) {
			var rowP = [];
			var rowS = [];
			var rowU = [];
			for (var j = 0; j<9; j++) {
				rowP[j] = parseInt(loadedData[level].Puzzle.charAt(i*9+j));
				rowS[j] = parseInt(loadedData[level].Solution.charAt(i*9+j));
				
			}
			solutionGrid[i] = rowS;
			problemGrid[i] = rowP;
		}
        finished = false;
        clearGrid();
        activeSquare = null;
        clearKeyboard();
        clearNoteKeyboard();
        document.getElementById("keyboard").className = 'clearfix inactive';
    }
    function clearGrid(clearProblem) {
	    for (var x = 1; x<=9; x++) {
	        for (var y = 1; y<=9; y++) {
	         	if (problemGrid[y-1][x-1]!==0) {
		         	if (clearProblem) {
			         	document.getElementById("s_"+x+"_"+y+"_n").innerHTML = "";
		         	} else {
			        	document.getElementById("s_"+x+"_"+y+"_n").innerHTML = problemGrid[y-1][x-1];
		        	}
		        	 document.getElementById("s_"+x+"_"+y).className = 'square';
		        } else {
			        document.getElementById("s_"+x+"_"+y).className = 'square editable';
			        document.getElementById("s_"+x+"_"+y+"_n").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_1").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_2").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_3").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_4").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_5").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_6").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_7").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_8").innerHTML = "";
			        document.getElementById("s_"+x+"_"+y+"_9").innerHTML = "";
		        }
	        }
        }
    }
    function levelSelect(_level) {
        console.log("levelSelect "+_level);
    	if (_level===level) {
	    	return;
    	}
    	clearGrid(true);
	    Ivy.Put("lastLevel", _level.toString(), "IVYSUDOKU.lastlevelsaveOK", "OK", "IVYSUDOKU.lastlevelsaveFAILED", "FAILED");
	    init(_level);
    }
    function lastlevelsaveOK(event,params) {
    }
    function lastlevelsaveFAILED(event,params) {
	    
    }
    function lastlevelOK(event,params) {
    
    	if (params.value!==null && params.value!=="") {
	    	level = parseInt(params.value);
	    	if (isNaN(level)) {
		    	level = 0;
		    	
	    	}
    	}
	    initProblem();
	    
       document.getElementById("dagens").options[level].selected = true;
        Ivy.Get("userGrid"+level, "IVYSUDOKU.usergridOK", "OK", "IVYSUDOKU.usergridFAILED", "FAILED");
    }
    function lastlevelFAILED(event,params) {
	    initProblem();
	    Ivy.Get("userGrid"+level, "IVYSUDOKU.usergridOK", "OK", "IVYSUDOKU.usergridFAILED", "FAILED");
    }
    function usergridOK(event, params) {
		var userGridString = params.value;
		var userGridArray = userGridString.split("|");
		if (userGridArray.length===81) {
			for (var i = 0; i<9; i++) {
				for (var j = 0; j<9; j++) {
					var s = userGridArray[i*9+j];
					if (isNaN(parseInt(s))) {
						var noteArray = JSON.parse(s);
						userGrid[i][j] = noteArray;
						for (var k=0; k<9; k++) {
							if (noteArray[k]>0) {
								document.getElementById("s_"+(j+1)+"_"+(i+1)+"_"+(k+1)).innerHTML = noteArray[k];
							}
						}
					} else if (parseInt(s)>0) {
						userGrid[i][j] = parseInt(s);
						document.getElementById("s_"+(j+1)+"_"+(i+1)+"_n").innerHTML = userGrid[i][j];
					}
				}
			}
		}
        console.log("usergridOK - errorcheck: ");
        if (errors()===0 && squaresLeft()===0) {
           victory(true);
        }
    }
    function usergridFAILED(event, params) {
    }                    
    function squareClick(id) {
   		if (!finished) {
        	if (activeSquare) {
            	activeSquare.className = 'square editable';
            	if (activeSquare.id===id || id===null) {
	            	activeSquare = null;
		            clearKeyboard();
		            clearNoteKeyboard();
		            document.getElementById("keyboard").className = 'clearfix inactive';
		            instruction(language("TAP_A_SQUARE"));
		            return;
            	}
            } else {
	            instruction("Select the number you want to select for this square.");
            }
			if (!document.getElementById(id)) {
				activeSquare = null;
	            clearKeyboard();
	            clearNoteKeyboard();
	            document.getElementById("keyboard").className = 'clearfix inactive';
	            instruction(language("TAP_A_SQUARE"));
	            return;
			}
        document.getElementById("keyboard").className = 'clearfix';
        if (document.getElementById(id).className === 'square') {
            // Non-editable
            activeSquare = null;
            clearKeyboard();
            clearNoteKeyboard();
            document.getElementById("keyboard").className = 'clearfix inactive';
            instruction(language("TAP_A_SQUARE"));
            return;
        }
         //    console.log(id);
            
            activeSquare = document.getElementById(id);
            activeSquare.className = 'square active editable';
            clearKeyboard();
            if (document.getElementById(activeSquare.id+"_n").innerHTML!=="") {
            	instruction(language("SELECT_A_NUMBER"));
	            document.getElementById("k_s_"+document.getElementById(activeSquare.id+"_n").innerHTML).className = 'square active editable';
            } else {
	            var haveNotes = false;
	            for (var i=1; i<=9; i++) {
		            if (document.getElementById(activeSquare.id+"_"+i).innerHTML === "") {
		            } else {
			            haveNotes = true;
		            }
				}
				if (haveNotes) {
					instruction(language("ADD_MORE_NOTES"));
				} else {
					instruction(language("TAP_A_NUMBER"));
				}
            }
            clearNoteKeyboard();
            for (var i = 1; i<=9; i++) {
	            if (document.getElementById(activeSquare.id+"_"+i).innerHTML!=="") {
		            document.getElementById("k_n_"+document.getElementById(activeSquare.id+"_"+i).innerHTML).className = 'square active editable';
	            }
            }
        }
        
    }
    function clearSquare() {
        if (activeSquare && !finished) {
        	clearKeyboard();
        	clearNoteKeyboard();
        	document.getElementById(activeSquare.id+"_n").innerHTML="";
        	setUserGrid(activeSquare.id,0);
        	clearSquareNotes();
        }
    }
    function clearSquareNotes() {
        if (activeSquare) {
            for (var i = 1; i<=9; i++) {
            	document.getElementById(activeSquare.id+"_"+i).innerHTML="";
            }
        }
    }
    function keyboardClick(number) {
    if (!finished) {
    	clearKeyboard();
    	clearNoteKeyboard();
    	clearSquareNotes();
    	if (!activeSquare) {
    		return;
    	}
    	
    	if (document.getElementById(activeSquare.id+"_n").innerHTML!=number) {
            document.getElementById("k_s_"+number).className = 'square active';
            instruction(language("SELECT_A_NEW_SQUARE"));
            if (activeSquare) {
	            document.getElementById(activeSquare.id+"_n").innerHTML = number;
	            setUserGrid(activeSquare.id,number);
            }
            
         } else {
	            document.getElementById("k_s_"+number).className = 'square';
	            clearSquare();
          }
        	   }         
    }
    function status() {
    	if (activeSquare) {
    		activeSquare.className = 'square editable';
    		activeSquare = null;
    		clearKeyboard();
            clearNoteKeyboard();
    	}
    	var status1 = "";
    	var status2 = "";
    	var instruct = "";
    	if (squaresLeft()===squaresTotal()) {
    		status1 = language("TAP_AN_EMPTY_SQUARE");
    		status2 = language("THEN_TAP_A_NUMBER");
    		instruct = language("TAP_A_SQUARE");
    	} else if (errors(true)-squaresLeft()<1 && squaresLeft()==0) {
    		status1 = language("CONGRATS2")+grad[level]+".";
    		status2 = language("RESTART_OR_ANOTHER");
    		instruct = language("CONGRATS")+grad[level]+"!";
    	} else if (errors(true)-squaresLeft()<1) {
        	status1 = language("NO_WRONG_NUMBERS");
        	instruct = language("TAP_A_SQUARE");
    	} else {
        	status1= language("THERE_ARE")+(errors(true)-squaresLeft())+language("ERRORS_IN_THE_PUZZLE");
        	instruct = language("TAP_A_SQUARE_ERROR");
    	}
    	if (squaresLeft()>0 && squaresLeft()!==squaresTotal()) {
        	status2 = language("YOU_HAVE")+squaresLeft()+language("SQUARES_LEFT");
    	}
        instruction(instruct);
        swal(status1,status2);
    }
    function errors(colorErrors) {
    	var errorCount = 0;
        for (var x = 0; x<9; x++) {
	        for (var y = 0; y<9; y++) {
	         	if (problemGrid[y][x]===0) {
		        	if (userGrid[y][x]===solutionGrid[y][x]) {
			        	
		        	} else {
		        		if (colorErrors && userGrid[y][x]!==0 && !(userGrid[y][x] instanceof Array)) {
		        			document.getElementById("s_"+(x+1)+"_"+(y+1)).className = 'square editable error';
		        		}
			        	errorCount +=1;
		        	}
		        }
	        }
		}
		return errorCount;
	}
	function squaresLeft() {
  	     var leftCount = 0;
  	     for (var x = 0; x<9; x++) {
	        for (var y = 0; y<9; y++) {
	         	if (problemGrid[y][x]===0) {
		        	if (userGrid[y][x]===0 || userGrid[y][x] instanceof Array) {
			        	leftCount +=1;
		        	}
		        }
	        }
		}
  	     return leftCount;
	     }
	     function squaresTotal() {
  	     var count = 0;
  	     for (var x = 0; x<9; x++) {
	        for (var y = 0; y<9; y++) {
	         	if (problemGrid[y][x]===0) {
		        	count +=1;
		        }
	        }
		}
  	     return count;
	     }
    function setUserGrid(activeSquareId,value) {
    	var koo = activeSquareId.split("_");
    	var x = koo[1]-1;
    	var y = koo[2]-1;
        userGrid[y][x]=value;
       var errs = errors();
       if (errs===0) {
           victory();
       } else {
           if (squaresLeft()===0) {
           		status();
           }
       }
       var ug = "";
       for (var y = 0; y<=8; y++) {
		   for (var x = 0; x<=8; x++) {
		   	if (!(y===0  && x===0)) {
		   		ug+="|";
		   	}
   			 if (problemGrid[y][x]===0) {
		        	if (userGrid[y][x]===0) {
			        	ug += "0";
			        } else if  (userGrid[y][x] instanceof Array) {
			        	ug += JSON.stringify(userGrid[y][x]);
		        	} else {
			        	ug += userGrid[y][x];
		        	}
	
	 		} else {
		 		ug += "0";
	 		}
		}
		}
		// console.log(ug);
       Ivy.Put("userGrid"+level, ug, "IVYSUDOKU.saveOK", "OK", "IVYSUDOKU.saveFAILED", "FAILED");
        Ivy.Put("lastLevel", level, "IVYSUDOKU.lastlevelsaveOK", "OK", "IVYSUDOKU.lastlevelsaveFAILED", "FAILED");
    }
    function  saveOK(event, params) {
    }
    function saveFAILED(event, params) {
    }
    function victory(already) {
        console.log("Victory!");
        instruction(language("CONGRATS")+grad[level]+"!");
        clearKeyboard();
        clearNoteKeyboard();
        document.getElementById("keyboard").className = 'clearfix inactive';
        finished = true;
        for (var x = 1; x<=9; x++) {
	        for (var y = 1; y<=9; y++) {
	         	if (problemGrid[y-1][x-1]===0) {
			        document.getElementById("s_"+x+"_"+y).className = 'square victory';
		        }
			}
		}
		if (already) {
			swal(language("CONGRATS2")+grad[level]+".",language("RESTART_OR_ANOTHER"));
		} else {
			swal(language("CONGRATS1"),language("CONGRATS2")+grad[level]+".");
		}
    }
    
    function getUserGrid(activeSquareId) {
    	var koo = activeSquareId.split("_");
    	var x = koo[1]-1;
    	var y = koo[2]-1;
        // return userGrid[y][x]=value;
        return userGrid[y][x];
    }
    
    function keyboardNoteClick(number) {
    	if (activeSquare && !finished) {
    		clearKeyboard();
            document.getElementById(activeSquare.id+"_n").innerHTML = "";
            if (document.getElementById(activeSquare.id+"_"+number).innerHTML==="") {
            	document.getElementById(activeSquare.id+"_"+number).innerHTML = number;
            	instruction(language("THE_SMALL_NUMBERS_ARE"));
            } else {
            	document.getElementById(activeSquare.id+"_"+number).innerHTML = "";
            }	            
        	if (document.getElementById("k_n_"+number).className==='square') {
           		document.getElementById("k_n_"+number).className = 'square active';
            } else {
	           document.getElementById("k_n_"+number).className = 'square'; 
            }
            var noteArray = [0,0,0,0,0,0,0,0,0];
            var haveNotes = false;
            for (var i=1; i<=9; i++) {
	            if (document.getElementById(activeSquare.id+"_"+i).innerHTML === "") {
		            noteArray[i-1] = 0;
	            } else {
		            noteArray[i-1] = i;
		            haveNotes = true;
	            }
			}
			if (haveNotes) {
				setUserGrid(activeSquare.id,noteArray);
			} else {
				setUserGrid(activeSquare.id, 0);
			}
        }
        
    }
    function clearKeyboard() {
        for (var i=1; i<=9; i++) {
        	document.getElementById("k_s_"+i).className = 'square';
    	}
    }
    function instruction(txt) {
	    // console.log(txt);
	   if (txt!==document.getElementById("instruction").innerHTML) {
	       // console.log(txt+" VS. "+document.getElementById("instruction").innerHTML);
	         window.clearTimeout(instruxAnimateTimer)
	        instruxAnimateTimer=setTimeout(function () {
		        document.getElementById("instruction").className = 'clear';
	        }, 1000);
	        document.getElementById("instruction").innerHTML = txt;
			document.getElementById("instruction").className = 'clear animate';
        
        }
    }
    function clearNoteKeyboard() {
       for (var i=1; i<=9; i++) {
        	document.getElementById("k_n_"+i).className = 'square';
    	}
    }
    function restart() {

        swal({   title: language("RESTART")+grad[level]+"?",   text: language("ALL_PROGRESS_WILL_BE_LOST"),   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: language("OK"),   cancelButtonText: language("CANCEL"),   closeOnConfirm: true,   closeOnCancel: true },
            function(isConfirm){
                if (isConfirm) { 
                    clearGrid(true);
                    Ivy.Put("userGrid"+level, "0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0", "IVYSUDOKU.saveOK", "OK", "IVYSUDOKU.saveFAILED", "FAILED");
                init(level);
            }
        });
    }
    function cheat(n) {
        for (var x = 0; x<9; x++) {
	        for (var y = 0; y<9; y++) {
	         	
	         	if (userGrid[y][x]===0 && problemGrid[y][x]===0) {
		        	if (n>0) {
			        	userGrid[y][x]=solutionGrid[y][x];
			        	squareClick("s_"+(x+1)+"_"+(y+1));
			        	keyboardClick(userGrid[y][x]);
						n -=1;
		        	}
		        }
	        }
		}
    }
    
    return {
        init:init,
      cheat: cheat,
        saveOK: saveOK,
        saveFAILED: saveFAILED,
        usergridOK: usergridOK,
        usergridFAILED: usergridFAILED,
        lastlevelOK: lastlevelOK,
        lastlevelsaveOK: lastlevelsaveOK,
        lastlevelFAILED: lastlevelFAILED
          };
})();
return IVYSUDOKU;
});
