//controls cursor movement changes and crosses over borders
//right and down is two positions per press, left and up are 1
class CursorMovementsClass {
    cursorRight() {
      
      if(horizontalCursorPosition/5 >= WIDTH-1  && verticalCursorPosition/10 >= HEIGHT-1)
      {
        return
      }
      else if (horizontalCursorPosition >= (WIDTH)*5){
        horizontalCursorPosition = 10
        verticalCursorPosition = verticalCursorPosition + 10
      }
      else if (horizontalCursorPosition >= (WIDTH)*5-5){
        horizontalCursorPosition = 5
        verticalCursorPosition = verticalCursorPosition + 10
      }
      else{
        horizontalCursorPosition = horizontalCursorPosition + 10
      }
      
    }

    cursorRightOneSpace(){

      if(horizontalCursorPosition/5 >= WIDTH-1  && verticalCursorPosition/10 >= HEIGHT-1)
        {
          //horizontalCursorPosition = horizontalCursorPosition + 5;
        }
        else if (horizontalCursorPosition >= (WIDTH)*5){
          horizontalCursorPosition = 0
          verticalCursorPosition = verticalCursorPosition + 10
        }
        else if (horizontalCursorPosition >= (WIDTH)*5-5){
          horizontalCursorPosition = 0
          verticalCursorPosition = verticalCursorPosition + 10
        }
        else{
          horizontalCursorPosition = horizontalCursorPosition + 5
        }


    }
    
    cursorLeft() {
      if(horizontalCursorPosition/5 <= 0 && verticalCursorPosition/10 <= 0)
      {
        return
      }
      if (horizontalCursorPosition <= 0) {
        horizontalCursorPosition = (WIDTH-1)*5
        verticalCursorPosition = verticalCursorPosition - 10
        
        
      }
      else{
        horizontalCursorPosition = horizontalCursorPosition - 5
      }
      
    }
    cursorUp() {
      if (verticalCursorPosition <= 0) {
        verticalCursorPosition = 0
        return -3
      }
      
      verticalCursorPosition = verticalCursorPosition - 10
      
    }
    cursorDown() {
      if (verticalCursorPosition  >= (HEIGHT-1)*10) {
      verticalCursorPosition = (HEIGHT-1)*10
        return -4
      }
    
      else if(verticalCursorPosition/10 == (HEIGHT-1)){
        verticalCursorPosition = verticalCursorPosition + 20
      }

      else if(verticalCursorPosition/10 == (HEIGHT-2)){
        verticalCursorPosition = verticalCursorPosition + 10
      }
      

      else{
        verticalCursorPosition = verticalCursorPosition + 20
      }
    }
  }

  