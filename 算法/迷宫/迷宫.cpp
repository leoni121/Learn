#include "stdio.h"   
#include "malloc.h" 
#include<stdlib.h>

// 1��7�ǿ��ܴ���ͨ·�� 
#define SM 7
#define SN 1	
#define ENDM 1
#define ENDN 7

#define STACK_INIT_SIZE 100
#define STACKINCREMENT 20

// ��Ӧ�ڵ��x, y����ͷ��� 
typedef struct Node
{
	int x;
	int y;
	int direc;
}Node;

//  ��Ӧջ�� ����Ӧ���Ƚ���� 
typedef struct SqStack
{
	Node *base;
	Node *top;
	int stacksize;
}SqStack;

// ���� 
int dx[4] = { 0, 1,  0, -1 };
int dy[4] = { 1, 0, -1,  0 };

// ��ͼ 
char MAP[9][9];

// ��ŵ�ͼ�Ŀ�ͨ�� 
int AA[9][9];

// ��ʼ��ջ 
int InitStack(SqStack *S)
{
	(*S).base = (Node *)malloc(STACK_INIT_SIZE * sizeof(Node));
	if (!(*S).base)
		return -1;
	(*S).top = (*S).base;
	(*S).stacksize = STACK_INIT_SIZE;
	return 0;
}

// �ͷ�ջ 
int DestroyStack(SqStack *S)
{
	free((*S).base);
	(*S).base = NULL;
	(*S).top = NULL;
	(*S).stacksize = 0;
	return 0;
}

// �ж�ջ�Ƿ�Ϊ�� 
int StackIsEmpty(SqStack S)
{
	if (S.top == S.base)
		return 1;
	else
		return 0;
}

// ������ 
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

// �ı�SqStack ���ҵõ�ǰһ���� i��i��j 
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

// ǽ 
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

// �������� �õ���Ӧ��Map 
int InputMAP()
{
	int row, col;
	printf("��ʹ��#���������ͼ��Ϣ���յ���һ���ո���ű�ʾ��:\n");
	printf("Input:\n");
	for (row = 0; row<9; row++)
		gets(MAP[row]);
//		�൱�ڵõ� row������ 
//  ����㶨��һ���ַ�����char a[10];��������gets(a);
// �ͱ�ʾ�Ӽ��̽���һ���ַ��������ŵ�����a�У� 

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
	printf("���Թ��޽⡣\n");
	DestroyStack(s);
	return 0;
}

int main()
{
//	�ڵ��λ��  �ͷ��� 
	int m, n, k;
//	�ڵ�λ�øı���λ�� �ͷ��� 
	int u, v;
	SqStack s;

	InitStack(&s);
	InputMAP();

//#define SM 7
//#define SN 1	
//#define ENDM 1
//#define ENDN 7
// ��ʶ��ʼ��λ�� ��1��7�� 
	m = SM;
	n = SN;

	while (1)
	{

		AA[m][n] = 1;
		k = -1;

		do
		{
//			k���� ����  ��ʱk == 0; 
			k++;

			while (k >= 4)
			{
//				��¼�����ջ 
				if (StackIsEmpty(s))
				{
					OptputNoAnswer(&s);
					return -1;
				}
				else
				{
					Pop(&s, &m, &n, &k);
//					kֵ�Ѿ��ı� 
					k++;
				}
			}
			
//			int dx[4] = { 0, 1,  0, -1 };
//			int dy[4] = { 1, 0, -1,  0 };
			
			u = m + dx[k];
			v = n + dy[k];
// ��ǽ�� �����߲�ͨ��ʱ�� 
		} while (AA[u][v] == 1 || R(u, v) == 1);

//		�����յ㣨7��1�� 
		if (u == ENDM && v == ENDN)
		{
			//	m��n��ǰһ���ģ�
			//	u��v�Ǻ�һ���� 
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
