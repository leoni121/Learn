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
// �õ����еĶ������Ľڵ�� �ṹ�� ���� 
HuffRec HT[2 * N - 1];


// m�Ƕ�Ӧ�������ɵĺ��û������  �����ܺ� 
int GetMinPos(int m)
{
	// s������ 
	int k, s;
	double Min;
	k = 0;
	Min = 9999.99;
	// ���û������ֵ�����ҵ���С����û�и��ڵ�� 
	for (s = 0; s <= m; s++)
	{
//		 HT[s]�������Ѿ����� 
		if (HT[s].Pr == 0 && HT[s].w < Min)
		{
			k = s;
			Min = HT[s].w;
		}
	}
	//�õ���Ӧ��Сֵ�� �±� 
	return k;
}

int CreateHuffmanTree()
{
	int i, j, m;
//	 wiװ��Ȩֵ 
	double wi;
	printf("�����������%d��Ȩֵ����������ȷ��Ȩֵ(1-100���ظ�������)��\n", N);
	printf("Input:\n");

// �õ��û�������  ����װ��HT[0-9] 
	for (i = 0; i<N; i++)
	{
		scanf("%lf", &wi);
		HT[i].w = wi;
	}

// 2N -1 �Ƕ������Ľڵ�����
// �����ɵĽڵ���±�  ��N-1 ��ʼ   
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
//	i��j������ 
	int i, j, m, pr;	
	// ��ʼ�� code[N][N] 
	for (i = 0; i<N; i++)
		for (j = 0; j<N; j++)
		{
			Code[i][j] = 0;
		}	
	
	// ��ʼ�� start[N]	
	for (i = 0; i<N; i++)
		Start[i] = 0;
	
//	�õ��û�����ֵ�����Ķ�Ӧ������Code	
	for (i = 0; i<N; i++)
	{
//		��Ӧ�û������ֵ�ĸ���  
		m = N;
		j = i;
		
//		���ڵ�û�и��ڵ� 
		while (j< 2 * N - 2)
		{
//			Pr����洢���Ƕ�Ӧ��  ���ڵ�HT[2 * N - 1] �±� 
			pr = HT[j].Pr;
			m--;
			if (j == HT[pr].Lch)
//			��������˳��洢 
				Code[i][m] = 0;
			else
				Code[i][m] = 1;

			j = pr;
		}
//		���Code�����￪ʼ    ��Ϊ��ʼ�����е�Ϊ��   ������� 
		Start[i] = m;
	}
	return 0;
}

int PrintfHuffmanCode()
{
	int i, j;
	printf("�ڵ�Ĺ������������£�\n");
	printf("Output:\n");
	for (i = 0; i<N; i++)
	{
		printf("Ȩֵ%10.4lf�Ĺ����������ǣ�", HT[i].w);

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
