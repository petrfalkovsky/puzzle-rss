import * as $ from 'jquery';
import Post from '@/post'
import'@/styles/style'
import xml from '@/assets/data'
import csv from '@/assets/data'
import json from '@/assets/json'
import WebpackLogo from '@/assets/webpack-logo'
import '@/styles/less.less'
import './styles/scss.scss'
import {mult, sum} from '@/calc'


const post = new Post('Вебпак пост, а ниже лого', WebpackLogo)

$('pre').addClass('code').html(post.toString())
console.log('Post to String', post.toString());

console.log('JSON:', json)
console.log('XML:', xml)
console.log('CSV:', csv)
console.log(mult(3, 4))
console.log(sum(3, 5))
