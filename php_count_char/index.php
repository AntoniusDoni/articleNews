<?php
$string = "randomrize";
$count=0;
$chr='';
foreach (count_chars($string, 1) as $i => $val)
{
 if($count<$val){
    $count=$val;
    $chr=chr($i);
 }   
  
}
echo "Huruf \"" , $chr , "\" muncul $count kali.<br>";
?>