package com.test;

import java.util.Scanner;

public class HelloWorld {
    public static void main(String[]args){
        Scanner s = new Scanner(System.in);
        System.out.println("请输入学号：");
        String num = s.nextLine();
        System.out.println("输入你的姓名：");
        String nm = s.nextLine();
        System.out.println("请输入性别：");
        String sex = s.nextLine();
        System.out.println("请输入年龄：");
        String age = s.nextLine();
        System.out.println("请输入身高：");
        String hg = s.nextLine();
        System.out.println("请输入体重：");
        String tg = s.nextLine();
        System.out.println("学号    姓名   性别   年龄   身高   体重");
        System.out.println(num+"    "+nm+"   "+sex+"    "+age+"    "+hg+"    "+tg);
    }
}
