#include "stdio.h" 
#include "malloc.h"
#define N 10

typedef struct HuffRec
{
	double w;
	int Pr, Lch, Rch;
}HuffRec, *HuffRecPtr;
int Code[N][N];
int Start[N];
// 得到所有的二叉树的节点的 结构体 数组 
HuffRec HT[2 * N - 1];


// m是对应的新生成的和用户输入的  数量总和 
int GetMinPos(int m)
{
	// s是索引 
	int k, s;
	double Min;
	k = 0;
	Min = 9999.99;
	// 在用户输入的值里面找到最小的且没有父节点的 
	for (s = 0; s <= m; s++)
	{
//		 HT[s]在上面已经定义 
		if (HT[s].Pr == 0 && HT[s].w < Min)
		{
			k = s;
			Min = HT[s].w;
		}
	}
	//得到对应最小值的 下标 
	return k;
}

int CreateHuffmanTree()
{
	int i, j, m;
//	 wi装入权值 
	double wi;
	printf("本题打算输入%d个权值，请输入正确的权值(1-100不重复的正数)。\n", N);
	printf("Input:\n");

// 得到用户的输入  并且装入HT[0-9] 
	for (i = 0; i<N; i++)
	{
		scanf("%lf", &wi);
		HT[i].w = wi;
	}

// 2N -1 是二叉树的节点总数
// 新生成的节点的下标  由N-1 开始   
	for (m = N; m< 2 * N - 1; m++)
	{
		i = GetMinPos(m - 1);
		HT[i].Pr = m;
		j = GetMinPos(m - 1);
		HT[j].Pr = m;
		
		HT[m].Lch = i;
		HT[m].Rch = j;
		HT[m].w = HT[i].w + HT[j].w;
	}
	return 0;
}


int GenerateCode()
{
//	i，j是索引 
	int i, j, m, pr;	
	// 初始化 code[N][N] 
	for (i = 0; i<N; i++)
		for (j = 0; j<N; j++)
		{
			Code[i][j] = 0;
		}	
	
	// 初始化 start[N]	
	for (i = 0; i<N; i++)
		Start[i] = 0;
	
//	得到用户输入值个数的对应个数的Code	
	for (i = 0; i<N; i++)
	{
//		对应用户输入的值的个数  
		m = N;
		j = i;
		
//		根节点没有父节点 
		while (j< 2 * N - 2)
		{
//			Pr里面存储的是对应的  父节点HT[2 * N - 1] 下标 
			pr = HT[j].Pr;
			m--;
			if (j == HT[pr].Lch)
//			这样才能顺序存储 
				Code[i][m] = 0;
			else
				Code[i][m] = 1;

			j = pr;
		}
//		标记Code从哪里开始    因为初始化所有的为零   做个标记 
		Start[i] = m;
	}
	return 0;
}

int PrintfHuffmanCode()
{
	int i, j;
	printf("节点的哈夫曼编码如下：\n");
	printf("Output:\n");
	for (i = 0; i<N; i++)
	{
		printf("权值%10.4lf的哈夫曼编码是：", HT[i].w);

		for (j = Start[i]; j<N; j++)
			printf("%d", Code[i][j]);

		printf("\n");
	}
	return 0;
}

int main()
{
	CreateHuffmanTree();
	GenerateCode();
	PrintfHuffmanCode();

	return 0;
}
