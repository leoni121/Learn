#include "stdio.h"   
#include "malloc.h" 
#include<stdlib.h>

// 1到7是可能存在通路的 
#define SM 7
#define SN 1	
#define ENDM 1
#define ENDN 7

#define STACK_INIT_SIZE 100
#define STACKINCREMENT 20

// 相应节点的x, y坐标和方向 
typedef struct Node
{
	int x;
	int y;
	int direc;
}Node;

//  相应栈， 做相应的先进后出 
typedef struct SqStack
{
	Node *base;
	Node *top;
	int stacksize;
}SqStack;

// 方向 
int dx[4] = { 0, 1,  0, -1 };
int dy[4] = { 1, 0, -1,  0 };

// 地图 
char MAP[9][9];

// 存放地图的可通性 
int AA[9][9];

// 初始化栈 
int InitStack(SqStack *S)
{
	(*S).base = (Node *)malloc(STACK_INIT_SIZE * sizeof(Node));
	if (!(*S).base)
		return -1;
	(*S).top = (*S).base;
	(*S).stacksize = STACK_INIT_SIZE;
	return 0;
}

// 释放栈 
int DestroyStack(SqStack *S)
{
	free((*S).base);
	(*S).base = NULL;
	(*S).top = NULL;
	(*S).stacksize = 0;
	return 0;
}

// 判断栈是否为空 
int StackIsEmpty(SqStack S)
{
	if (S.top == S.base)
		return 1;
	else
		return 0;
}

// 新增加 
int Push(SqStack *S, int i, int j, int k)
{
	if ((*S).top - (*S).base >= (*S).stacksize)
	{
		(*S).base = (Node *)realloc((*S).base, ((*S).stacksize + STACKINCREMENT) * sizeof(Node));
		if (!(*S).base)
			return -1;
		(*S).top = (*S).base + (*S).stacksize;
		(*S).stacksize += STACKINCREMENT;
	}
	(*S).top->x = i;
	(*S).top->y = j;
	(*S).top->direc = k;
	(*S).top++;
	return 0;
}

// 改变SqStack 并且得到前一个的 i，i，j 
int Pop(SqStack *S, int *i, int *j, int *k)
{
	if ((*S).top == (*S).base)
		return -1;
	--(*S).top;
	*i = (*S).top->x;
	*j = (*S).top->y;
	*k = (*S).top->direc;
	return 0;
}

// 墙 
int R(int u, int v)
{

	if (u<0 || v<0)
		return 1;
	if (u>8 || v>8)
		return 1;
	if (AA[u][v] == 1)
		return 1;

	return 0;
}

// 根据输入 得到相应的Map 
int InputMAP()
{
	int row, col;
	printf("请使用#符号输入地图信息（空地用一个空格符号表示）:\n");
	printf("Input:\n");
	for (row = 0; row<9; row++)
		gets(MAP[row]);
//		相当于得到 row个数组 
//  如果你定义一个字符数组char a[10];这样定义gets(a);
// 就表示从键盘接收一个字符串，并放到数组a中， 

	for (row = 0; row<9; row++)
		for (col = 0; col<9; col++)
		{
			if (MAP[row][col] == '#')
				AA[row][col] = 1;
			else
				AA[row][col] = 0;
		}

	return 0;
}

int OptputNoAnswer(SqStack *s)
{
	printf("OutPut:\n");
	printf("本迷宫无解。\n");
	DestroyStack(s);
	return 0;
}

int main()
{
//	节点的位置  和方向 
	int m, n, k;
//	节点位置改变后的位置 和方向 
	int u, v;
	SqStack s;

	InitStack(&s);
	InputMAP();

//#define SM 7
//#define SN 1	
//#define ENDM 1
//#define ENDN 7
// 标识开始的位置 （1，7） 
	m = SM;
	n = SN;

	while (1)
	{

		AA[m][n] = 1;
		k = -1;

		do
		{
//			k代表 方向  此时k == 0; 
			k++;

			while (k >= 4)
			{
//				记录这个的栈 
				if (StackIsEmpty(s))
				{
					OptputNoAnswer(&s);
					return -1;
				}
				else
				{
					Pop(&s, &m, &n, &k);
//					k值已经改变 
					k++;
				}
			}
			
//			int dx[4] = { 0, 1,  0, -1 };
//			int dy[4] = { 1, 0, -1,  0 };
			
			u = m + dx[k];
			v = n + dy[k];
// 有墙， 或者走不通的时候 
		} while (AA[u][v] == 1 || R(u, v) == 1);

//		到达终点（7，1） 
		if (u == ENDM && v == ENDN)
		{
			//	m，n是前一个的，
			//	u，v是后一个的 
			Push(&s, m, n, k);
			Push(&s, u, v, 0);

			while (!StackIsEmpty(s))
			{
				Pop(&s, &m, &n, &k);
				MAP[m][n] = '1';
			}
			
			
			printf("OutPut:\n");
			for (m = 0; m<9; m++)
			{
				for (n = 0; n<9; n++)
					printf("%c ", MAP[m][n]);
				printf("\n");
			}
			DestroyStack(&s);
			return 0;
		}

		Push(&s, m, n, k);
		m = u;
		n = v;

	}
}
